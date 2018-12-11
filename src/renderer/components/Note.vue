<template>
	<div>
    Note {{getName}}
	</div>
</template>

<script>
export default {
  name: 'note',
  methods: {
    getName() {
      return this.$electron.remote.app.getName();
    },
  },
};
</script>

<style>

</style>
