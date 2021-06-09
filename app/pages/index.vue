<template>
  <section class="latest-posts">
    <div class="posts">
      <nuxt-link
        :to="'posts/' + post.fields.slug"
        class="post"
        v-for="(post, index) in posts"
        :key="index"
      >
        <div class="thumb">
          <img :src="post.fields.image.fields.file.url" />
        </div>
        <div class="post-text">
          <p>{{ formatDate(post.sys.createdAt) }}</p>
          <p>{{ post.fields.title }}</p>
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import client from "~/plugins/contentful";
export default {
  asyncData({ params }) {
    return client
      .getEntries({
        content_type: "post",
        order: "-sys.createdAt",
      })
      .then((entries) => {
        return { posts: entries.items };
      })
      .catch((e) => console.log(e));
  },
  head: {
    title: "記事一覧",
  },
  methods: {
    formatDate(iso) {
      const date = new Date(iso);
      const yyyy = new String(date.getFullYear());
      const mm = new String(date.getMonth() + 1).padStart(2, "0");
      const dd = new String(date.getDate()).padStart(2, "0");
      return `${yyyy}.${mm}.${dd}`;
    },
  },
};
</script>
