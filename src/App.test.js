import { render, screen } from "@testing-library/react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";
import VideoPlayer from "./components/video";
import { getSeconds } from "./components/player/logic";

Enzyme.configure({ adapter: new Adapter() });

describe("renders video component to page", () => {
  test("video-player should exist in the page", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("#video-player")).toBeTruthy();
  });
});

describe("Custom controls exist", () => {
  test("custom controms should exist in the page", () => {
    const wrapper = shallow(<VideoPlayer />);
    expect(wrapper.find("#video-controls")).toBeTruthy();
  });
});

describe("Play Button exist", () => {
  test("Play button should exist in the page", () => {
    const wrapper = shallow(<VideoPlayer />);
    expect(wrapper.find(".player-button")).toBeTruthy();
  });
});

describe("Volume exists in page and is disabled", () => {
  test("Volume button exists and is disabled", () => {
    const wrapper = shallow(<VideoPlayer />);
    expect(wrapper.find("#disabled-button")).toBeTruthy();
    expect(wrapper.find("#disabled-button").props().disabled).toBe();
  });
});

describe("Progress bar and progress exists", () => {
  test("Progress bar and progress should exist in video player", () => {
    const wrapper = shallow(<VideoPlayer />);
    expect(wrapper.find(".video-progress")).toBeTruthy();
    expect(wrapper.find(".progress")).toBeTruthy();
  });
});

describe("Loop button shold exist in video player", () => {
  test("loop button exists in custom controls", () => {
    const { getByTitle } = render(<VideoPlayer />);
    expect(getByTitle("Loop (l)")).toBeInTheDocument();
  });
});

describe("Fullscreen button shold exist in video player", () => {
  test("fullscreen button exists in custom controls", () => {
    const { getByTitle } = render(<VideoPlayer />);
    expect(getByTitle("Fullscreen (f)")).toBeInTheDocument();
  });
});

describe("Test getSeconds function", () => {
  test("It should return 2", () => {
    expect(getSeconds(2, 7849).toString()).toEqual("02");
  });
});
