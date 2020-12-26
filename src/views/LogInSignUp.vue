<template>
    <h1><strong>Welcome to Tweet-t-t</strong></h1>
    <LogIn/>
    <SignUp/>
</template>

<script>

import LogIn from "../components/LogIn"
import SignUp from "../components/SignUp"

export default {
    name: "LogInSignUp",
    components: { LogIn, SignUp }
}
</script>

<style lang="scss" scoped>

</style>