<template>
  <article class="article">
    <div class="single">
      <h1 class="post-title">{{ post.fields.title }}</h1>
      <p class="post-created-at">{{ formatDate(post.sys.createdAt) }}</p>
      <div class="post-content" v-html="$md.render(post.fields.content)"></div>
    </div>
  </article>
</template>

<script>
import client from '~/plugins/contentful'

export default {
  asyncData({ params, error, payload }) {
    if (payload) return { post: payload }
    return client
      .getEntries({
        content_type: 'post',
        'fields.slug': params.slug,
      })
      .then(entries => {
        return { post: entries.items[0] }
      })
      .catch(e => console.log(e))
  },
  head() {
    return {
      title: this.post.fields.title,
    }
  },
  mounted() {
    console.log(this.post)
  },
  methods: {
    formatDate(iso) {
      const date = new Date(iso)
      const yyyy = new String(date.getFullYear())
      const mm = new String(date.getMonth() + 1).padStart(2, "0")
      const dd = new String(date.getDate()).padStart(2, "0")
      return `${yyyy}.${mm}.${dd}`
    }
  }
}
</script>