import { useLoadingBar } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
    name: "LoadingBarContent",
    setup() {
        window.$loadingBar = useLoadingBar();
        return () => null;
    },
});
