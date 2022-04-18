import { flushPromises, mount } from "@vue/test-utils";
import PuzzlePage from "./PuzzlePage.vue";
import PuzzleElement from "./PuzzleElement.vue";
import { nextTick } from "vue";

import { fetchPuzzleData } from "../../api/api.js";
import { NButton } from "naive-ui";
jest.mock("../../api/api.js");

describe("Language list test", () => {
  let wrapper;

  const lang1 = "lang1";
  const lang2 = "lang2";
  const lang3 = "lang3";

  beforeEach(async () => {
    const dummyPuzzle = {
      languages: [lang1, lang2, lang3],
      tracks: [
        { id: 0, path: "test1.wav" },
        { id: 1, path: "test2.wav" },
        { id: 2, path: "test3.wav" },
      ],
    };

    fetchPuzzleData.mockResolvedValue(dummyPuzzle);

    wrapper = mount(PuzzlePage, {
      global: {
        stubs: {
          PuzzleElement: true,
          NButton: true,
        },
      },
    });

    await flushPromises();
  });

  it("should remove language from available after it chosen", async () => {
    const puzzleElement = wrapper.getComponent(PuzzleElement);

    puzzleElement.vm.$emit(PuzzleElement.events.LANGUAGE_CHANGED, lang1, null);
    await nextTick();

    expect(puzzleElement.props().languages).toStrictEqual([lang2, lang3]);
  });

  it("should add language to available after choosing another", async () => {
    const puzzleElement = wrapper.getComponent(PuzzleElement);

    puzzleElement.vm.$emit(PuzzleElement.events.LANGUAGE_CHANGED, lang1, null);
    await nextTick();

    puzzleElement.vm.$emit(PuzzleElement.events.LANGUAGE_CHANGED, lang2, lang1);
    await nextTick();

    expect(puzzleElement.props().languages).toStrictEqual([lang1, lang3]);
  });

  it("should stop all players except current", async () => {
    const stoppingCallback = jest.fn();

    const puzzleElements = wrapper.findAllComponents(PuzzleElement);

    puzzleElements[0].vm.$emit(
      PuzzleElement.events.PLAY_STARTED,
      stoppingCallback
    );
    await nextTick();

    puzzleElements[1].vm.$emit(PuzzleElement.events.PLAY_STARTED, () => {});
    await nextTick();

    expect(stoppingCallback).toHaveBeenCalled();
  });

  it("shouldn't stop own player on seek and after unpause", async () => {
    const stoppingCallback = jest.fn();

    const puzzleElements = wrapper.findAllComponents(PuzzleElement);

    puzzleElements[0].vm.$emit(
      PuzzleElement.events.PLAY_STARTED,
      stoppingCallback
    );
    await nextTick();

    puzzleElements[0].vm.$emit(
      PuzzleElement.events.PLAY_STARTED,
      stoppingCallback
    );
    await nextTick();

    expect(stoppingCallback).not.toHaveBeenCalled();
  });

  it("should disable submit button on mount", () => {
    const submitButton = wrapper.getComponent(".submit_button");

    expect(submitButton.props()).toHaveProperty("disabled", true);
  });

  it("should enable submit button after language selection completed", async () => {
    const submitButton = wrapper.getComponent(".submit_button");

    const puzzleElements = wrapper.findAllComponents(PuzzleElement);

    puzzleElements[0].vm.$emit(
      PuzzleElement.events.LANGUAGE_CHANGED,
      lang1,
      null
    );
    puzzleElements[1].vm.$emit(
      PuzzleElement.events.LANGUAGE_CHANGED,
      lang2,
      null
    );
    puzzleElements[2].vm.$emit(
      PuzzleElement.events.LANGUAGE_CHANGED,
      lang3,
      null
    );
    await nextTick();

    expect(submitButton.props()).toHaveProperty("disabled", false);
  });
});
