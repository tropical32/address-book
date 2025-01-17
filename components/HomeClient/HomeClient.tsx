"use client";

import useSWR, { preload } from "swr";

import AddressBook from "@/components/AddressBook/AddressBook";
import Search from "@/components/Search/Search";
import InfiniteScrollTrigger from "../InfiniteScrollTrigger/InfiniteScrollTrigger";
import { useCallback, useMemo, useState } from "react";
import { User } from "@/types/types";
import { constructSearchParam, getSelectedNationalities } from "@/utils/utils";
import Loading from "../Loading/Loading";

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
    (url: string) => fetch(url).then((res) => res.json()),
    [],
  );

  const url = useMemo(
    () => constructSearchParam(selectedNationalities, page).toString(),
    [page, selectedNationalities],
  );
  const { isLoading } = useSWR(url, fetcher, {
    onSuccess: (data) => {
      setAllUsers((allUsers) => [...allUsers, ...data.results]);
    },
  });

  const preloadUrl = useMemo(
    () => constructSearchParam(selectedNationalities, page + 1).toString(),
    [page, selectedNationalities],
  );
  preload(preloadUrl, fetcher);

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
    <>
      <Search onSearchChangeAction={onSearchChangeAction} />
      <main className="responsive-container">
        <AddressBook users={filteredUsers} />
        {isLoading && <Loading />}
        {!isLoading && !searchQuery && shouldFetchMoreUsers && (
          <InfiniteScrollTrigger onBottomReached={onBottomReached} />
        )}
        {!shouldFetchMoreUsers && (
          <p className="text-gray-500 text-center mt-8 mb-8">
            End of users catalog.
          </p>
        )}
        {searchQuery && shouldFetchMoreUsers && (
          <p className="text-gray-500 text-center mt-8 mb-8">
            Automatic loading disabled when searching.
          </p>
        )}
      </main>
    </>
  );
}
