$(function(){
  // jobs have a description, job title, start date and end date
  var Job = Backbone.Model.extend({});

  // collection of jobs
  var JobList = Backbone.Collection.extend({
    model: Job,
    // "use" local storage so that the model won't make an ajax request.
    localStorage: new Backbone.LocalStorage("jobs"),
    comparator: 'order'
  });

  // create job list from pre-loaded js object
  var Jobs = new JobList(job_list);

  // view for a job
  var JobView = Backbone.View.extend({
    tagName:  "li",
    template: _.template($('#job-template').html()),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });


  // categories
  var Category = Backbone.Model.extend({});

  // collection of Categories
  var CategoryList = Backbone.Collection.extend({
    model: Category,
    // "use" local storage so that the model won't make an ajax request.
    localStorage: new Backbone.LocalStorage("categories"),
    comparator: 'order'
  });

  // create category list from pre-loaded js object
  var Categories = new CategoryList(category_list);

  // view for a Category
  var CategoryView = Backbone.View.extend({
    tagName:  "li",
    template: _.template($('#category-template').html()),
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });





  // The Application
  var AppView = Backbone.View.extend({
    el: $("#app"),

    initialize: function() {
      // this shouldn't need to be once. without once,
      // it triggers N times where N = # of items in collection
      // TODO: use routers to reduce what needs to be listened to.
      this.listenToOnce(Jobs, 'all', this.addAllJobs);
      this.listenToOnce(Categories, 'all', this.addAllCategories);
      Jobs.fetch();
      Categories.fetch();
    },

    addOneCategory: function(category) {
      var view = new CategoryView({model: category});
      this.$("#category-list").append(view.render().el);
    },
    addAllCategories: function() {
      Categories.each(this.addOneCategory, this);
    },

    addOneJob: function(job) {
      var view = new JobView({model: job});
      this.$("#job-list").append(view.render().el);
    },
    addAllJobs: function() {
      Jobs.each(this.addOneJob, this);
    }

  });

  // start the app
  var App = new AppView;

});
