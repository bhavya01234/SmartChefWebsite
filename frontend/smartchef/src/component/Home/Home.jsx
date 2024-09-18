import React, { useEffect } from 'react';
import '../Home/styles.css';
import videoSrc from '../Home/video.mp4';
import 'remixicon/fonts/remixicon.css';

const HomePage = () => {
    useEffect(() => {
        // Locomotive animation code here
        // Navbar animation code here
        // Loading animation code here
        // Video container animation code here
        // Cursor animation code here
    }, []);

    return (

        <div>
            <div id="nav">
                <div id="nav-part1">
                    <svg id="twogood" width="106" height="83" viewBox="0 0 106 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* SVG code here */}
                    </svg>
                    <svg
                        id="twogoodlogo"
                        width="62"
                        height="63"
                        viewBox="0 0 62 63"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="go1438215768"
                        style={{ transform: 'translate(0px, 0px)' }}
                    >
                        <path
                            d="M46.8316 0C42.9105 0 39.1501 1.59236 36.3775 4.42677C33.605 7.26119 32.0474 11.1055 32.0474 15.114C32.0474 19.1224 33.605 22.9667 36.3775 25.8011C39.1501 28.6355 42.9105 30.2279 46.8316 30.2279C50.7526 30.2279 54.513 28.6355 57.2856 25.8011C60.0582 22.9667 61.6158 19.1224 61.6158 15.114C61.6158 11.1055 60.0582 7.26119 57.2856 4.42677C54.513 1.59236 50.7526 0 46.8316 0Z"
                            fill="currentColor"
                        ></path>
                        <path
                            d="M14.793 0C10.872 0 7.11154 1.59236 4.33897 4.42677C1.56639 7.26119 0.00878906 11.1055 0.00878906 15.114C0.00878906 19.1224 1.56639 22.9667 4.33897 25.8011C7.11154 28.6355 10.872 30.2279 14.793 30.2279C18.714 30.2279 22.4744 28.6355 25.247 25.8011C28.0196 22.9667 29.5772 19.1224 29.5772 15.114C29.5772 11.1055 28.0196 7.26119 25.247 4.42677C22.4744 1.59236 18.714 0 14.793 0Z"
                            fill="currentColor"
                        ></path>
                        <path
                            d="M36.9805 32.7422L32.0366 37.7963L56.6819 62.9913L61.6258 57.9372L36.9805 32.7422Z"
                            fill="currentColor"
                        ></path>
                        <path
                            d="M56.6836 32.7485L32.0383 57.9435L36.9822 62.9976L61.6275 37.8026L56.6836 32.7485Z"
                            fill="currentColor"
                        ></path>
                        <path
                            d="M4.94386 32.7464L0 37.8005L24.6453 62.9955L29.5892 57.9414L4.94386 32.7464Z"
                            fill="currentColor"
                        ></path>
                        <path
                            d="M24.647 32.7527L0.00170898 57.9477L4.94557 63.0018L29.5909 37.8068L24.647 32.7527Z"
                            fill="currentColor"
                        ></path>
                    </svg>

                </div>
                <div id="nav-part2">
                    <div id="links">
                        <a href="#">Login</a>
                        <a href="#">SignUp</a>
                        <a href="#">About Us</a>
                    </div>
                    <div id="icons">
                        <i class="ri-menu-fill"></i>
                        <i class="ri-restaurant-2-line"></i>
                    </div>
                </div>
            </div>
            <div id="main">
                <div id="page1">
                    <h1>Smart</h1>
                    <h1>Kitchen</h1>
                    <div id="video-container">
                        <div id="play">PLAY</div>
                        {/* <video autoplay loop muted src="./assets/video.mp4"></video> */}
                        <video autoPlay loop muted src={videoSrc}></video>
                    </div>
                </div>
                <div id="page2">
                    {/* Page 2 content here */}
                    <div id="elem1" class="elem">
                        <img data-scroll data-scroll-speed="1"
                            src="https://cdn.sanity.io/images/w8f1ak3c/production/ee1c2e8894a4c47c4f4ce71b8973589f8a5045b2-902x1500.png/Rectangle%203.png?rect=1,0,900,1500&w=640&h=1067&fit=min&auto=format"
                            alt="" />
                        <div data-scroll data-scroll-speed="-2" class="dets"></div>

                    </div>

                    <div id="elem2" class="elem">
                        <img data-scroll data-scroll-speed="1"
                            src="https://cdn.sanity.io/images/w8f1ak3c/production/bb84b7106e978c37f5aa92c8d5781751b2e9d9f2-900x1500.png/Rectangle%202.png?w=640&h=1067&auto=format"
                            alt="" />
                        <div data-scroll data-scroll-speed="-2" class="dets"></div>

                    </div>
                    <div id="elem3" class="elem">
                        <img data-scroll data-scroll-speed="1"
                            src="https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="" />
                        <div data-scroll data-scroll-speed="-2" class="dets"></div>
                    </div>


                </div>
                <div id="page3">
                    {/* Page 3 content here */}


                    <div class="child" id="child3">
                        <img src="https://img.freepik.com/premium-photo/recipe-app-interface-with-images-dishes-ingredient-lists_1327465-3529.jpg?w=1060"
                            alt="" />

                    </div>
                    <div class="child" id="child1">
                        <img src="https://img.freepik.com/premium-photo/food-transparent-background_985276-26867.jpg?w=1060"
                            alt="" />
                    </div>
                    <div class="child" id="child2">
                        <img src="https://img.freepik.com/free-psd/food-lover-taking-photos-food_23-2150847067.jpg?t=st=1726689585~exp=1726693185~hmac=e56d49087bce503692f1bf133d1ce965a8c28981ef17a12eb19838ba7e962f92&w=826"
                            alt="" />

                    </div>
                    <div class="child" id="child4">
                        <img src="https://img.freepik.com/premium-photo/creative-cuisine-cooking-pot-fire-set-ingredients-cream-mushrooms-soup_489646-20255.jpg?w=826"
                            alt="" />

                    </div>
                </div>
            </div>
            <div id="cursor"></div>
        </div>
    );
};

export default HomePage;


// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import LocomotiveScroll from "locomotive-scroll";
// import 'locomotive-scroll/dist/locomotive-scroll.css'; // Make sure to import Locomotive Scroll styles
// import '../Home/styles.css';
// // import "./App.css"; // Add your styles

// gsap.registerPlugin(ScrollTrigger);

// function App() {
//     const mainRef = useRef(null);
//     const cursorRef = useRef(null);
//     const playButtonRef = useRef(null);

//     useEffect(() => {
//         // Locomotive Scroll Setup
//         const locoScroll = new LocomotiveScroll({
//             el: mainRef.current,
//             smooth: true,
//         });

//         locoScroll.on("scroll", ScrollTrigger.update);

//         ScrollTrigger.scrollerProxy(mainRef.current, {
//             scrollTop(value) {
//                 return arguments.length
//                     ? locoScroll.scrollTo(value, 0, 0)
//                     : locoScroll.scroll.instance.scroll.y;
//             },
//             getBoundingClientRect() {
//                 return {
//                     top: 0,
//                     left: 0,
//                     width: window.innerWidth,
//                     height: window.innerHeight,
//                 };
//             },
//             pinType: mainRef.current.style.transform ? "transform" : "fixed",
//         });

//         ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
//         ScrollTrigger.refresh();

//         // Cleanup on unmount
//         return () => {
//             ScrollTrigger.removeEventListener("refresh", locoScroll.update);
//             locoScroll.destroy();
//         };
//     }, []);

//     useEffect(() => {
//         // GSAP Animations

//         // Navbar Animation
//         gsap.to("#nav-part1 svg", {
//             transform: "translateY(-100%)",
//             scrollTrigger: {
//                 trigger: "#page1",
//                 scroller: "#main",
//                 start: "top 0",
//                 end: "top -5%",
//                 scrub: true,
//             },
//         });
//         gsap.to("#nav-part2 #links", {
//             transform: "translateY(-100%)",
//             opacity: 0,
//             scrollTrigger: {
//                 trigger: "#page1",
//                 scroller: "#main",
//                 start: "top 0",
//                 end: "top -5%",
//                 scrub: true,
//             },
//         });

//         // Loading Animations
//         gsap.from("#page1 h1", {
//             y: 100,
//             opacity: 0,
//             delay: 0.5,
//             duration: 0.9,
//             stagger: 0.3,
//         });
//         gsap.from("#page1 #video-container", {
//             scale: 0.9,
//             opacity: 0,
//             delay: 1.3,
//             duration: 0.5,
//         });

//         // Video Button Hover Animations
//         const videoContainer = document.querySelector("#video-container");
//         videoContainer.addEventListener("mouseenter", () => {
//             gsap.to(playButtonRef.current, { scale: 1, opacity: 1 });
//         });
//         videoContainer.addEventListener("mouseleave", () => {
//             gsap.to(playButtonRef.current, { scale: 0, opacity: 0 });
//         });

//         // Custom Cursor Animation
//         const moveCursor = (e) => {
//             gsap.to(cursorRef.current, {
//                 left: e.clientX,
//                 top: e.clientY,
//             });
//         };

//         document.addEventListener("mousemove", moveCursor);

//         // Cleanup on unmount
//         return () => {
//             document.removeEventListener("mousemove", moveCursor);
//         };
//     }, []);

//     return (
//         <div id="main" ref={mainRef}>
//             <nav id="nav">
//                 <div id="nav-part1">
//                     <svg>{/* Add your SVG here */}</svg>
//                 </div>
//                 <div id="nav-part2">
//                     <div id="links">{/* Add your links here */}</div>
//                 </div>
//             </nav>

//             <section id="page1">
//                 <h1>Page 1</h1>
//                 <div id="video-container">
//                     <video src="your-video.mp4"></video>
//                     <div id="play" ref={playButtonRef}>
//                         {/* Play Button */}
//                     </div>
//                 </div>
//             </section>

//             <div id="cursor" ref={cursorRef}></div>
//         </div>
//     );
// }

// export default App;
