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
      meta:[
        { hid: 'description', name: 'description', content: this.post.fields.description },
        { hid: 'og:site_name', property: 'og:site_name', content: this.post.fields.title },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: 'https://amazing-curie-4208ac.netlify.app//posts/' + this.post.fields.slug },
        { hid: 'og:title', property: 'og:title', content: this.post.fields.title },
        { hid: 'og:description', property: 'og:description', content: this.post.fields.description },
        { hid: 'og:image', property: 'og:image', content: "https:"+this.post.fields.image.fields.file.url },
        { hid: 'twitter:card', name: 'twitter:card', content: "summary" },
        { hid: 'twitter:site', name: 'twitter:site', content: "@"}
      ]
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