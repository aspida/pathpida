<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue'

export type Query = {
  hoge: string
  fuga: {
    a: number
    b: { c: string }[]
  }
}

export default Vue.extend({})
</script>
