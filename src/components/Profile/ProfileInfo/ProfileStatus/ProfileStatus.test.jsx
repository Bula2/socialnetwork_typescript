import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatus status="Hello" />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span).not.toBeNull();
    });
    test("after creation input should be hide", () => {
        const component = create(<ProfileStatus status="Hello" />);
        const root = component.root;
        let input = root.findByType("input")
        expect(input).toBeNull();
    });
});