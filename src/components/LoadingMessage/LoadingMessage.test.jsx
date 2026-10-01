import { render, screen } from "@testing-library/react";
import LoadingMessage from "./LoadingMessage";

describe("LoadingMessage", () => {
    it("shows the loading message", () => {
        render(
            <LoadingMessage message="Loading tasks..." />
        );

        const message = screen.getByText(
            "Loading tasks..."
        );

        expect(message).toBeInTheDocument();
    });
});