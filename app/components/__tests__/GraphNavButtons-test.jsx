jest.unmock("../GraphNavButtons");

import React from "react";
import { shallow, mount } from "enzyme";

import GraphNavButtons from "../GraphNavButtons";

describe("GraphNavButtons", () => {
  let wrapper;

  describe("rendering", () => {
    beforeEach(() => {
      wrapper = mount(
        <GraphNavButtons 
          canClickPrev={true}
          canClickNext={true}
          prevClick={jest.genMockFunction()}
          nextClick={jest.genMockFunction()}
          swapAnnotations={jest.genMockFunction()} />
      );
    });

    it("shows prev button", () => {
      let prev = wrapper.find("button").filterWhere(button => button.text() == "Prev");
      expect(prev.length).toBe(1);
      expect(prev.get(0).disabled).toBe(false);

      wrapper.setProps({ canClickPrev: false });
      expect(prev.get(0).disabled).toBe(true);
    });

    it("shows next button", () => {
      let next = wrapper.find("button").filterWhere(button => button.text() == "Next");
      expect(next.length).toBe(1);
      expect(next.get(0).disabled).toBe(false);

      wrapper.setProps({ canClickNext: false });
      expect(next.get(0).disabled).toBe(true);
    });

    it("shows hide button", () => {
      let hide = wrapper.find("#oligrapherHideAnnotationsButton");
      expect(hide.length).toBe(1);
    });
  });

  describe("behavior", () => {
    let prevClick = jest.genMockFunction();
    let nextClick = jest.genMockFunction();
    let swapAnnotations = jest.genMockFunction();

    beforeEach(() => {
      wrapper = shallow(
        <GraphNavButtons 
          canClickPrev={true}
          canClickNext={true}
          prevClick={prevClick}
          nextClick={nextClick}
          swapAnnotations={swapAnnotations} />
      );
    });    

    it("uses prevClick", () => {
      let prev = wrapper.find("button").filterWhere(button => button.text() == "Prev");
      prev.simulate("click");
      expect(prevClick.mock.calls.length).toBe(1);
    });

    it("uses nextClick", () => {
      let next = wrapper.find("button").filterWhere(button => button.text() == "Next");
      next.simulate("click");
      expect(nextClick.mock.calls.length).toBe(1);
    });

    it("uses swapAnnotations", () => {
      let hide = wrapper.find("#oligrapherHideAnnotationsButton");
      hide.simulate("click");
      expect(swapAnnotations.mock.calls.length).toBe(1);
    });
  });
});  