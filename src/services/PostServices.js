import requests from "@/axios/Instance";
const PostServices = {
  getCategporieType: async (type) => {
    return requests.get(`/category/${type}/public`);
  },
  getPosts: async () => {
    return requests.get(`/public/events`);
  },
  getTeam: async () => {
    return requests.get("/public/team");
  },
  getBooks: async () => {
    return requests.get("/public/books");
  },
  getTestimonials: async () => {
    return requests.get("/public/testimonials");
  },
  getEventsByCategory: async (id) => {
    return requests.get("/public/events/" + id);
  },
  displayEvent: async (id) => {
    return requests.get(`/public/${id}/events`);
  },
};

export default PostServices;
