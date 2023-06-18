import React, { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FeedView from "../../ui/Feed/FeedView";
import FeedHeaderDropdown from "../../ui/Feed/FeedHeaderDropdown";
import { useFeed } from "../../hooks/feeds/feedsHooks";
import { initialize, lemmyInstance } from "../../../lemmy/LemmyInstance";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  getAllCommunities,
  getSubscribedCommunities,
} from "../../../slices/communities/communitiesActions";
import CIconButton from "../../ui/CIconButton";
import { selectAccounts } from "../../../slices/accounts/accountsSlice";
import { loadBookmarks } from "../../../slices/bookmarks/bookmarksActions";

function FeedsIndexScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  const feed = useFeed();

  const accounts = useAppSelector(selectAccounts);

  const dispatch = useAppDispatch();

  const headerTitle = () => <FeedHeaderDropdown title={sortFix()} enabled />;
  const headerLeft = () => (
    <CIconButton
      name="star-outline"
      onPress={() => navigation.navigate("Subscriptions")}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle,
    });
  }, [feed.sort]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft,
    });

    load().then();
  }, []);

  const load = async () => {
    if (!lemmyInstance) {
      try {
        await initialize({
          server: accounts[0].instance,
          username: accounts[0].username,
          password: accounts[0].password,
          auth: accounts[0].token,
        });

        feed.doLoad(false);
      } catch (e) {
        console.log("Error", e);
      }
    }
    dispatch(getSubscribedCommunities());
    dispatch(getAllCommunities());
    dispatch(loadBookmarks());
  };

  const sortFix = () => {
    if (feed.sort === "MostComments") return "Most Comments";
    if (feed.sort === "TopDay") return "Top Day";
    if (feed.sort === "TopWeek") return "Top Week";

    return feed.sort;
  };

  return <FeedView feed={feed} />;
}

export default FeedsIndexScreen;