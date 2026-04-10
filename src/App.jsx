import { useEffect, useState } from "react";
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

const categoryLabels = ["한옥", "호수 근처", "인기 급상승", "오두막", "전망 좋은 숙소"];

function matchesDestination(stay, query) {
  const normalizedTokens = query
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (normalizedTokens.length === 0) {
    return true;
  }

  const searchableText = `${stay.title} ${stay.location}`.toLowerCase();

  return normalizedTokens.every((token) => searchableText.includes(token));
}

function App() {
  const [guests, setGuests] = useState(initialGuests);
  const [activePanel, setActivePanel] = useState(null);
  const [destination, setDestination] = useState("");
  const [stays, setStays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadStays() {
      try {
        setIsLoading(true);
        const response = await fetch("/data/stays.json");

        if (!response.ok) {
          throw new Error("숙소 목록을 불러오지 못했습니다.");
        }

        const data = await response.json();

        if (isMounted) {
          setStays(data.stays);
          setErrorMessage("");
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStays();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalTravelers = guests.adults + guests.children;
  const guestSummary =
    totalTravelers > 0 ? `게스트 ${totalTravelers}명` : "여행자 추가";
  const petSummary = guests.pets > 0 ? ` · 반려동물 ${guests.pets}마리` : "";
  const travelerSummary = `${guestSummary}${petSummary}`;
  const hasDestination = destination.trim().length > 0;
  const destinationSummary = hasDestination ? destination : "어디든지";
  const filteredStays = stays.filter((stay) => matchesDestination(stay, destination));

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
  }

  function closePanels() {
    setActivePanel(null);
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
          destinationValue={destination}
          suggestions={destinationSuggestions}
          guestSummary={travelerSummary}
          activePanel={activePanel}
          onOpenPanel={setActivePanel}
          onClosePanels={closePanels}
          onDestinationChange={setDestination}
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
            <button key={label} type="button" className={styles.filterChip}>
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.summaryCard}>
          <div>
            <p className={styles.summaryLabel}>현재 검색 조건</p>
            <strong>
              {destinationSummary} · 5월 1일 - 5월 15일 · {travelerSummary}
            </strong>
            <p className={styles.summaryNote}>
              {hasDestination
                ? `${filteredStays.length}개의 추천 숙소가 즉시 반영되고 있어요.`
                : "여행지를 입력하면 추천 검색어와 숙소 목록이 바로 바뀝니다."}
            </p>
          </div>
        </section>

        <StayGrid
          stays={filteredStays}
          isLoading={isLoading}
          errorMessage={errorMessage}
          destinationValue={destination}
        />
      </main>
    </div>
  );
}

export default App;
