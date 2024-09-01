import { navigateTo } from "$lib/utils/navigation.client";
import { GITHUB_REPO_URL } from "$lib/constants/common";

interface Content {
  title: string;
  action: "navigate" | "redirect";
  route: string;
}

export interface ContentButtonProps {
  title: string;
  onClick: () => void;
}

const contents: Content[] = [
  {
    title: "three.js",
    action: "navigate",
    route: "/three",
  },
  {
    title: "ammo.js",
    action: "navigate",
    route: "/ammo",
  },
  {
    title: "playcanvas/engine",
    action: "navigate",
    route: "/playcanvas",
  },
  {
    title: "rotate-sphere",
    action: "navigate",
    route: "/rotate-sphere",
  },
  {
    title: "bounce-sphere",
    action: "navigate",
    route: "/bounce-sphere",
  },
  {
    title: "github repository",
    action: "redirect",
    route: GITHUB_REPO_URL,
  },
];

export async function load() {
  const propsArray: ContentButtonProps[] = contents.map((content) => ({
    title: content.title,
    onClick: _getOnClick(content.action, content.route),
  }));

  function _getOnClick(action: string, route: string): () => void {
    const actions: { [key: string]: () => void } = {
      navigate: () => navigateTo(route),
      redirect: () => window.open(route, "_blank"),
    };
    return actions[action] || (() => {});
  }

  return { propsArray };
}
