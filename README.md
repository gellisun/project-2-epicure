# Project 2 - Epicure

![Homepage](/public/images/README-photos/homepage.png "HomePage")

Launch the app: **[epicure](https://vast-brook-71035-0d5000787e44.herokuapp.com)** :fork_and_knife:


## Description

<p>This is my second solo project on the General Assembly Software Engineering Immersive. Unit 2 was all about learning to build a full-stack application with Node/Express/MongoDB from the ground up.</p>

## Technologies Used

- HTML, CSS, JavaScript
- Express, Node.JS
- MongoDB/Mongoose
- Git, GitHub 

## Brief

### Deliver a working full-stack app that meets or exceeds these technical requirements:
-  Have at least 2 data entities in addition to the User Model - one entity that represents the main functional idea for the app and another with a One:Many or Many:Many relationship with that main entity (embedded or referenced)
- Use OAuth authentication.
- Implement basic authorization that restricts access to features that need a logged in user in order to work by "protecting" those routes from anonymous users using the ensureLoggedIn middleware. In addition, ensure that editing and deletion of a data resource can only be done by the user that created that data.
- Have full-CRUD data operations somewhere within the app's features.
- Be styled such that the app looks and feels similar to apps we use on a daily basis - consistent and polished user interface.
- Be deployed online (Heroku).
- A README.md file

## Planning

<p> My app had to be a platform where, as a user I could pin all in one place everything related to food: restaurants I have been to and that I would like to go back to o recommend if asked, recipes I created myself or that I found and tried etc… Ideally I would have wanted it to be a social platform where to follow people and favourite their posts based on personal likings.<br>
The ERD is the overall idea I had during planning of the data that would be stored in the database.</p>

![ERD](/public/images/README-photos/ERD.png "ERD")

<p>Trello is the tool I used to manage every step of the project:</p>

![Trello Board](/public/images/README-photos/trello.png "Trello board")

<p>As it is shown in the wireframe, the idea was to make the app responsive so I tried my best to achieve that. I planned to have a login page, a page that would display all posts and different pages that, as a user, I could go to if I wanted:</p>

- to add delete or edit a post<br>
- to add delete or edit a comment<br>

![Wireframe 1](/public/images/README-photos/Wireframe01.png "Wireframe 1")

![Wireframe 2](/public/images/README-photos/Wireframe02.png "Wireframe 2")

![Wireframe 3](/public/images/README-photos/Wireframe03.png "Wireframe 3")

## Build/Code Process

<p>When I created the data entities I decided to set the user separately and reference it in the post and to create the comment and nest it inside the post.</p>

```JavaScript
const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const postSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    link: String,
    photo: String,
    content: String,
    wishlist: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comments: [commentSchema]
  }, {
    timestamps: true
  });
```
<p>One of the controllers actions that I am most happy about is the posts index function:</p>

```JavaScript
async function index(req, res) {
  try {
    const user = req.user;
    let posts = [];
    posts = await Post.find({}).populate("user").sort("-createdAt");
    const isLoggedIn = !!user;
    const hasPosts = !!posts.length;
    let wishlistPosts = [];
    if (isLoggedIn) {
      wishlistPosts = posts.filter(
        (post) => post.wishlist && post.user.equals(user._id)
      );
    }

    res.render("posts/index", { posts, isLoggedIn, hasPosts, wishlistPosts });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
}
```
<p>It has a functionality that I managed to implement which is the fact that each user that logs in has a different view, the logged in user can see all the posts (created by him/her and created by other users) but can only see in the wishlist section the posts that were checked as wishlist by him/herself. Unfortunately the time run out before I could be able to add the possibility for the user to add to the wishlist other users' posts - functionality I aim to implement after presentation day - at the moment in his/her wishlist can only go the posts marked by him/her.</p>

![All Posts](/public/images/README-photos/posts-page.png "All Posts")

## Challenges
<p>The biggest challenge for me was the styling. I tried to make it responsive but I run out of time while focusing on functionalities to add on top of my MVP. Also, I spent a whole day going through the documentation for different ways I could implement the add photo functionality. At the moment the photos can only be added through a link, what I would like for the future is to implement an API that allows to upload photos from the user's device.</p>

## Wins
<p>The biggest win was for me the clarity I had about the processes to implement User-Centric CRUD. Thanks to repetition plus the course material I can say I am very confident in how to approach this process. By Monday during project week I already had all the CRUD implemented and I am very proud of this achievement.<br>
I was happy to successfully manage to give different availables actions to the user on the posts or comments. Each user can only edit or delete his/her own post, edit or delete his/her own comment.</p>

![User 1 View](/public/images/README-photos/user-a-view.png "User 1 view")

![User 2 View](/public/images/README-photos/user-b-view.png "User 2 view")

## Key Learnings/Takeaways
<p>One thing I learnt when working on this project is how important it is to have a very well structured plan. We are at week six of this bootcamp and I still find my project process being too unstructured. I think the CSS in this project should have been implemented while creating the various functionalities/views, I didn't prioritize it and therefore I didn't achieve the goal I set to have an app that can also be mobile.<br>
Finally, I learnt that taking a leap in doing something never done before requires a lot of time and also in this case, planning.</p>

## Future Improvements
<p>Some were already mentioned but in short:</p>

- add the possiblity for the logged in user to put other users' posts in their wishlist
- make the application responsive with media queries
- give the application the added value of being a social platform where people can follow each other
