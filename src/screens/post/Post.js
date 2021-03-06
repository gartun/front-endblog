import React from 'react';
import {useParams} from "react-router";
import {Link} from "react-router-dom";

import "./post.css"
import { posts, users } from "../../data/data";


const Post = () => {
    const {id} = useParams();
    const {title,
            tags,
            userId,
            body} = posts.find(post => post.postId === +id);


    const author = users.find(user => user.userId === userId);
    
    const relatedArticles = posts.filter(post => post.tags.some(tag => tags.includes(tag)));

    return (
        <>
        <section className="post">
            <h2 className="post__title">{title}</h2>
            <p className="author-name"><strong>Yazar:</strong> { author.name }</p>
            <p>
                <span><strong>etiketler:</strong></span>
                {
                    tags.map(tag => <Link key={tag} to={"/search/" + tag}><span className="badge badge-pill badge-info mx-1">{tag}</span></Link>)
                }
            </p>
            <h3 className="text-center my-3">İçerik</h3>
            <ul className="post__content--ul">
                {
                    body.map((arr, ind) => 
                        arr[0] === "h2" ? (
                            <li key={ind}>
                                <a href={"#h2" + ind}>{arr[1]}</a>
                            </li>
                        ) : null
                    ) 
                }    
            </ul>
            <div className="post__body">{
                body.map((arr,ind) => (
                    arr[0]==="h2" ? (
                      <h2
                        key={ind}
                        id={"h2" + ind}
                        className="post__body--subtitle"
                      >{ arr[1] }</h2>): arr[0] === "p" ? <p key={ind} className="post__body--parag">{arr[1]}</p>: arr[0]==="code" ? <pre key={ind} className="post__body--pre"><code>{arr[1]}</code></pre>: arr[0]==="h3" ? <h3 key={ind} className="post__body--subh3">{arr[1]}</h3> : null
                ))
            }</div>
        </section>
        <aside className="card related-articles">
            <div className="card-header">
                Benzer Yazılar
            </div>
            <ul className="list-group list-group-flush">
                {
                    relatedArticles.map(article => 
                        <Link to={"/post/" + article.postId} key={article.postId}>
                            <li className="list-group-item">{article.title}</li>
                        </Link>
                        )
                }
            </ul>
        </aside>
        </>
    )
}

export default Post
