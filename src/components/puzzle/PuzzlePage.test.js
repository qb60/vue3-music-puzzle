import { flushPromises, mount } from "@vue/test-utils";
import PuzzlePage from "./PuzzlePage.vue";
import PuzzleElement from "./PuzzleElement.vue";
import { nextTick } from "vue";

import { fetchPuzzleData } from "../../api/api.js";
jest.mock("../../api/api.js");

describe("Language list test", () => {
  it("should remove language from available after it chosen", async () => {
    const lang1 = "lang1";
    const lang2 = "lang2";

    const dummyPuzzle = {
      languages: [lang1, lang2],
      tracks: [{ id: 0, path: "test1.wav" }],
    };

    fetchPuzzleData.mockResolvedValue(dummyPuzzle);

    const wrapper = mount(PuzzlePage, {
      global: {
        stubs: {
          PuzzleElement: true,
        },
      },
    });

    await flushPromises();

    const puzzleElement = wrapper.getComponent(PuzzleElement);

    puzzleElement.vm.$emit(PuzzleElement.events.LANGUAGE_CHANGED, lang1, null);
    await nextTick();

    expect(puzzleElement.props().languages).toStrictEqual([lang2]);
  });

  it("should add language to available after chosing another", async () => {
    const lang1 = "lang1";
    const lang2 = "lang2";

    const dummyPuzzle = {
      languages: [lang1, lang2],
      tracks: [{ id: 0, path: "test1.wav" }],
    };

    fetchPuzzleData.mockResolvedValue(dummyPuzzle);

    const wrapper = mount(PuzzlePage, {
      global: {
        stubs: {
          PuzzleElement: true,
        },
      },
    });

    await flushPromises();

    const puzzleElement = wrapper.getComponent(PuzzleElement);

    puzzleElement.vm.$emit(PuzzleElement.events.LANGUAGE_CHANGED, lang1, null);
    await nextTick();

    puzzleElement.vm.$emit(PuzzleElement.events.LANGUAGE_CHANGED, lang2, lang1);
    await nextTick();

    expect(puzzleElement.props().languages).toStrictEqual([lang1]);
  });
});
