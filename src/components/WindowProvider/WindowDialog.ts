import { useDialog } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
    name: "DialogContent",
    setup() {
        window.$dialog = useDialog();
        return () => null;
    },
});
