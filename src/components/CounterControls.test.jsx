import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import CounterControls from "./CounterControls";
import { store } from "../app/store";

describe("CounterControls", () => {
    it("increments the counter when Increase is clicked", async () => {
        const user = userEvent.setup();

        render(
            <Provider store={store}>
                <CounterControls />
            </Provider>
        );

        const increaseButton =
            screen.getByRole("button", {
                name: "Increase"
            });

        await user.click(increaseButton);

        expect(store.getState().counter.value).toBe(1);
    });
});