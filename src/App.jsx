import { useRef, useState } from "react";
import GuestSelector from "./components/GuestSelector";
import SearchBar from "./components/SearchBar";
import StayGrid from "./components/StayGrid";
import destinationSuggestions from "./data/destinationSuggestions";
import styles from "./App.module.css";

const guestConfig = {
  adults: {
    title: "성인",
    description: "13세 이상",
    max: 8,
  },
  children: {
    title: "어린이",
    description: "2~12세",
    max: 6,
  },
  infants: {
    title: "유아",
    description: "2세 미만",
    max: 4,
  },
  pets: {
    title: "반려동물",
    description: "반려동물 동반 가능 숙소만 표시",
    max: 3,
  },
};

const initialGuests = {
  adults: 0,
  children: 0,
  infants: 0,
  pets: 0,
};

const initialSearchForm = {
  destination: "",
  checkIn: "",
  checkOut: "",
};

const categoryLabels = ["한옥", "호수 근처", "인기 급상승", "오두막", "전망 좋은 숙소"];

function formatDateSummary(checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return "날짜 미지정";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  })
    .formatRange(new Date(checkIn), new Date(checkOut))
    .replace(" ~ ", " - ");
}

function App() {
  const [guests, setGuests] = useState(initialGuests);
  const [activePanel, setActivePanel] = useState(null);
  const [searchForm, setSearchForm] = useState(initialSearchForm);
  const [stays, setStays] = useState([]);
  const [searchMeta, setSearchMeta] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [searchErrorMessage, setSearchErrorMessage] = useState("");
  const requestIdRef = useRef(0);

  const totalTravelers = guests.adults + guests.children;
  const guestSummary =
    totalTravelers > 0 ? `게스트 ${totalTravelers}명` : "여행자 추가";
  const petSummary = guests.pets > 0 ? ` · 반려동물 ${guests.pets}마리` : "";
  const travelerSummary = `${guestSummary}${petSummary}`;
  const destinationSummary = searchMeta?.destination || "검색 전";
  const dateSummary = formatDateSummary(searchMeta?.checkIn, searchMeta?.checkOut);
  const searchFeedbackMessage = formErrorMessage || searchErrorMessage;

  function updateGuestCount(type, delta) {
    setGuests((currentGuests) => {
      const nextValue = currentGuests[type] + delta;

      if (nextValue < 0 || nextValue > guestConfig[type].max) {
        return currentGuests;
      }

      return {
        ...currentGuests,
        [type]: nextValue,
      };
    });

    setFormErrorMessage("");
    setSearchErrorMessage("");
  }

  function closePanels() {
    setActivePanel(null);
  }

  function handleDestinationChange(nextDestination) {
    setSearchForm((currentSearchForm) => ({
      ...currentSearchForm,
      destination: nextDestination,
    }));
    setFormErrorMessage("");
    setSearchErrorMessage("");
  }

  function handleDateChange(field, value) {
    setSearchForm((currentSearchForm) => ({
      ...currentSearchForm,
      [field]: value,
    }));
    setFormErrorMessage("");
    setSearchErrorMessage("");
  }

  function handleCategoryClick(label) {
    setSearchForm((currentSearchForm) => ({
      ...currentSearchForm,
      destination: label,
    }));
    setFormErrorMessage("");
    setSearchErrorMessage("");
  }

  async function handleSearchSubmit(event) {
    event.preventDefault();

    const destination = searchForm.destination.trim();

    if (!destination) {
      setFormErrorMessage("여행지를 입력해 주세요.");
      return;
    }

    if (totalTravelers === 0) {
      setFormErrorMessage("여행 인원을 1명 이상 선택해 주세요.");
      setActivePanel("guests");
      return;
    }

    if (
      (searchForm.checkIn && !searchForm.checkOut) ||
      (!searchForm.checkIn && searchForm.checkOut)
    ) {
      setFormErrorMessage("날짜 검색은 체크인과 체크아웃을 함께 선택해 주세요.");
      return;
    }

    closePanels();
    setFormErrorMessage("");
    setSearchErrorMessage("");
    setIsSearching(true);

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    const searchParams = new URLSearchParams({
      destination,
      guests: String(totalTravelers),
    });

    if (guests.pets > 0) {
      searchParams.set("pets", String(guests.pets));
    }

    if (searchForm.checkIn && searchForm.checkOut) {
      searchParams.set("checkIn", searchForm.checkIn);
      searchParams.set("checkOut", searchForm.checkOut);
    }

    try {
      const response = await fetch(`/api/stays/search?${searchParams.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "숙소 검색에 실패했습니다.");
      }

      if (requestId !== requestIdRef.current) {
        return;
      }

      setStays(data.stays);
      setSearchMeta(data.meta);
      setHasSearched(true);
    } catch (error) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      setStays([]);
      setSearchMeta({
        checkIn: searchForm.checkIn || null,
        checkOut: searchForm.checkOut || null,
        destination,
        guests: totalTravelers,
        pets: guests.pets,
        total: 0,
      });
      setHasSearched(true);
      setSearchErrorMessage(error.message);
    } finally {
      if (requestId === requestIdRef.current) {
        setIsSearching(false);
      }
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brandRow}>
          <div className={styles.brand}>gwanak-bnb</div>
          <nav className={styles.topNav} aria-label="메인 메뉴">
            <button type="button" className={styles.navButton}>
              숙소
            </button>
            <button type="button" className={styles.navButton}>
              체험
            </button>
            <button type="button" className={styles.navButton}>
              온라인 체험
            </button>
          </nav>
        </div>

        <div className={styles.heroCopy}>
          <h1>마음에 드는 숙소를 찾아보세요.</h1>
        </div>

        <SearchBar
          destinationValue={searchForm.destination}
          suggestions={destinationSuggestions}
          checkIn={searchForm.checkIn}
          checkOut={searchForm.checkOut}
          guestSummary={travelerSummary}
          activePanel={activePanel}
          feedbackMessage={searchFeedbackMessage}
          isSearching={isSearching}
          onOpenPanel={setActivePanel}
          onClosePanels={closePanels}
          onDestinationChange={handleDestinationChange}
          onCheckInChange={(value) => handleDateChange("checkIn", value)}
          onCheckOutChange={(value) => handleDateChange("checkOut", value)}
          onSubmit={handleSearchSubmit}
        >
          <GuestSelector
            guests={guests}
            guestConfig={guestConfig}
            onDecrement={(type) => updateGuestCount(type, -1)}
            onIncrement={(type) => updateGuestCount(type, 1)}
          />
        </SearchBar>

        <div className={styles.filterRow}>
          {categoryLabels.map((label) => (
            <button
              key={label}
              type="button"
              className={styles.filterChip}
              onClick={() => handleCategoryClick(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.summaryCard}>
          <div>
            <p className={styles.summaryLabel}>
              {hasSearched ? "검색 결과 후" : "검색 결과 전"}
            </p>
            <strong>
              {hasSearched
                ? `${destinationSummary} · ${dateSummary} · 게스트 ${searchMeta?.guests ?? 0}명${
                    searchMeta?.pets ? ` · 반려동물 ${searchMeta.pets}마리` : ""
                  }`
                : "여행지와 여행 인원을 선택하고 검색을 시작해보세요."}
            </strong>
            <p className={styles.summaryNote}>
              {isSearching
                ? "원격 백엔드 API로 검색 요청을 보내는 중입니다."
                : hasSearched
                  ? `${searchMeta?.total ?? 0}개의 검색 결과가 같은 화면 아래에 즉시 반영됩니다.`
                  : "날짜는 선택 사항이며, 검색 결과는 새로고침 없이 바로 렌더링됩니다."}
            </p>
          </div>
        </section>

        <StayGrid
          stays={stays}
          hasSearched={hasSearched}
          isLoading={isSearching}
          errorMessage={searchErrorMessage}
          destinationValue={searchMeta?.destination || searchForm.destination}
        />
      </main>
    </div>
  );
}

export default App;
