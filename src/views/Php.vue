<template>
    <div>
       Path: {{ pathMatch }}
    </div>
    <div>
        
    </div>
</template>

<script setup lang="ts">
// type: 1: php, 2: WordPress
const documentList = [
    {
        key: "wp-login.php",
        url: "https://raw.githubusercontent.com/WordPress/WordPress/refs/heads/master/wp-login.php",
    },
    {
        key: "wp-config.php",
        url: "https://github.com/WordPress/WordPress/raw/refs/heads/master/wp-config-sample.php",
    },
    {
        key: "wp-mail.php",
        url: "https://github.com/WordPress/WordPress/raw/refs/heads/master/wp-mail.php",
    },


    {
        key: "wp-admin",
        url: "https://github.com/WordPress/WordPress/tree/master/wp-admin",
    },
    {
        key: "wp-content",
        url: "https://github.com/WordPress/WordPress/tree/master/wp-content",
    },
    {
        key: "wp-includes",
        url: "https://github.com/WordPress/WordPress/tree/master/wp-includes",
    },



    {
        key: "phpinfo.php",
        url: "https://www.php.net/manual/en/function.phpinfo.php",
    },
];

const defaultDocument = {
    key: null,
    type: 1,
    url: "https://www.php.net/manual/zh/index.php",
};

defineProps({
  pathMatch: String
})

</script>

<style scoped>

</style>
