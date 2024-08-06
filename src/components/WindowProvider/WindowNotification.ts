import { useNotification } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
    name: "NotificationContent",
    setup() {
        window.$notification = useNotification()
        return () => null
  },
})
