import { memo } from "react";

function MemoChild() {
    console.log("MemoChild rendered");

    return (
        <div>
            <h3>Child Component</h3>
            <p>I don't depend on the parent's count.</p>
        </div>
    );
}

export default memo(MemoChild);