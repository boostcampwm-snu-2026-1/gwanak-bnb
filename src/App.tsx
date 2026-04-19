import "./App.css";
import { useState } from "react";
import { Search } from "lucide-react";
import GuestFilterSelectPopover from "./components/GuestFilterSelectPopover";
import LocationSearchBar from "./components/LocationSearchBar";
import StaySearchResultCard from "./components/StaySearchResultCard";
import { Button } from "./components/ui/button";
import { useStaySearch } from "./hooks/useStaySearch";
import type { GuestFilter } from "./types";

const RESULT_PANEL_CLASS_NAME =
  "w-full rounded-[1.75rem] border border-dashed border-border/80 bg-background px-6 py-12 text-center text-sm text-muted-foreground md:col-span-2 xl:col-span-3";

function App() {
  const [locationQuery, setLocationQuery] = useState("");
  const [guestFilter, setGuestFilter] = useState<GuestFilter>({
    adult: 0,
    kids: 0,
    infant: 0,
    pets: 0,
  });
  const { error, hasSearched, isFetching, results, search } = useStaySearch();

  const renderSearchResults = () => {
    if (!hasSearched) {
      return null;
    }

    if (isFetching) {
      return (
        <div className={RESULT_PANEL_CLASS_NAME}>
          검색 결과를 불러오는 중입니다.
        </div>
      );
    }

    if (error) {
      return (
        <div className={RESULT_PANEL_CLASS_NAME}>
          Render 서버에서 숙소 검색 API를 찾지 못했습니다. 현재 배포된
          서버에는 `/api/stays/search` 가 필요합니다.
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className={RESULT_PANEL_CLASS_NAME}>
          검색 조건에 맞는 숙소가 없습니다.
        </div>
      );
    }

    return results.map((result) => (
      <StaySearchResultCard key={result.id} result={result} />
    ));
  };

  return (
    <section id="center">
      <div className="flex w-full max-w-4xl items-center gap-3 rounded-full border border-border/70 bg-background p-1.5 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.28)] md:gap-0">
        <LocationSearchBar
          query={locationQuery}
          onQueryChange={setLocationQuery}
          triggerClassName="max-w-none rounded-none border-0 bg-transparent px-5 py-2.5 shadow-none hover:border-transparent md:rounded-l-full"
        />
        <div className="hidden h-10 w-px bg-border/80 md:block" />
        <GuestFilterSelectPopover
          value={guestFilter}
          onGuestFilterChange={setGuestFilter}
          triggerClassName="max-w-none rounded-none border-0 bg-transparent px-5 py-2.5 shadow-none hover:border-transparent md:rounded-r-full"
        />
        <Button
          type="button"
          size="icon-lg"
          className="ml-auto size-14 rounded-full bg-[#ff385c] text-white shadow-[0_16px_30px_-18px_rgba(255,56,92,0.95)] hover:bg-[#e31c5f]"
          aria-label="검색"
          onClick={() => search({ location: locationQuery, guestFilter })}
        >
          <Search className="size-5" />
        </Button>
      </div>
      {hasSearched ? (
        <div className="grid w-full grid-cols-1 gap-6 pt-2 md:grid-cols-2 xl:grid-cols-3">
          {renderSearchResults()}
        </div>
      ) : null}
    </section>
  );
}

export default App;
