"use client";

import useSWR from "swr";

import AddressBook from "@/components/AddressBook/AddressBook";
import Search from "@/components/Search/Search";
import InfiniteScrollTrigger from "../InfiniteScrollTrigger/InfiniteScrollTrigger";
import { useCallback, useMemo, useState } from "react";
import { User } from "@/types/types";
import { constructSearchParam, getSelectedNationalities } from "@/utils/utils";

/**
 * The top level component for the home page.
 *
 * This component renders the `Search` component which displays a search field
 * and a list of users.
 *
 * @returns The top level component for the home page.
 */
export default function HomeClient() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const shouldFetchMoreUsers = useMemo(
    () => allUsers.length < 1000,
    [allUsers],
  );
  const selectedNationalities = useMemo(() => getSelectedNationalities(), []);

  const fetcher = useCallback(
    async (url: string) => {
      const res = await fetch(url);
      const json = await res.json();
      const results: User[] = json.results;

      setAllUsers([...allUsers, ...results]);
    },
    [allUsers],
  );

  const url = useMemo(
    () => constructSearchParam(selectedNationalities, page),
    [page, selectedNationalities],
  );
  const { isLoading } = useSWR(url, fetcher);

  const onBottomReached = useCallback(
    (intersectionObserverEntry: IntersectionObserverEntry[]) => {
      if (intersectionObserverEntry[0].isIntersecting) {
        setPage((page) => page + 1);
      }
    },
    [],
  );

  const onSearchChangeAction = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const fullName =
        user.name.first.toLowerCase() + " " + user.name.last.toLowerCase();

      return fullName.includes(searchQuery.toLowerCase());
    });
  }, [allUsers, searchQuery]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Search onSearchChangeAction={onSearchChangeAction} />
      <AddressBook users={filteredUsers} />
      {isLoading && (
        <p className="text-gray-500 text-center mt-8 mb-8">Loading...</p>
      )}
      {!isLoading && !isLoading && !searchQuery && shouldFetchMoreUsers && (
        <InfiniteScrollTrigger onBottomReached={onBottomReached} />
      )}
      {!shouldFetchMoreUsers && (
        <p className="text-gray-500 text-center mt-8 mb-8">
          End of users catalog.
        </p>
      )}
    </main>
  );
}
