import { useMessage } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
    name: "MessageContent",
    setup() {
        window.$message = useMessage();
        return () => null;
    },
});
