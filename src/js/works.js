import React, {Component} from 'react'
import {Link} from 'react-router';
import {findDOMNode} from "react-dom";
import $ from 'jquery';

import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import pluging from 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import {TweenMax, Power2, TimelineLite} from 'gsap';

import workData from './data/workData.json';
import magnificPopup from 'magnific-popup';

class Works extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        let it = this;
        let $window = $(window);
        $('.bg_live').css({'height': $window.innerHeight()});
        $('.layout__container').css({'height': $window.innerHeight()});
        $window.on('resize', () => {
            $('.bg_live').css({'height': $window.innerHeight()});
            $('.layout__container').css({'height': $window.innerHeight()});
        });
        $('.mfp-popup').magnificPopup({
            delegate: 'li',
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
            image: {
                verticalFit: true
            },
            gallery:{
                enabled:true
            },
            zoom: {
                enabled: true,
                duration: 500 // don't foget to change the duration also in CSS
            },
            callbacks: {
                change: function(){
                    console.log(this)
                }
            }
        });
    }

    render() {

        // もっとシンプルにしたい
        let works_list1 = workData.works.map((item, index) => {
            let imgsrc = "/images/" + item.image_1x1;
            if (index === 0 || index === 1 || index === 2 || index === 3) {
                return (
                    <li key={index} data-author={item.name_en} href={imgsrc}>
                        <img src={imgsrc} alt={item.title_ja}/>
                    </li>
                )
            }
        });
        let works_list2 = workData.works.map((item, index) => {
            let imgsrc = "/images/" + item.image_1x1;
            if (index === 4 || index === 5 || index === 6 || index === 7 || index === 8) {
                return (
                    <li key={index} data-author={item.name_en} href={imgsrc}>
                        <img src={imgsrc} alt={item.title_ja}/>
                    </li>
                )
            }
        });
        let works_list3 = workData.works.map((item, index) => {
            let imgsrc = "/images/" + item.image_1x1;
            if (index === 9 || index === 10 || index === 11 || index === 12) {
                return (
                    <li key={index} data-author={item.name_en} href={imgsrc}>
                        <img src={imgsrc} alt={item.title_ja}/>
                    </li>
                )
            }
        });

        return (
            <div className="layout__container page__works">
                <main className="layout__container--wrapper">
                    <article>
                        <h2 data-subtitle="修士研究発表">Works</h2>
                        <div className="layout__container--content">
                            <ul className="mfp-popup">{works_list1}</ul>
                            <ul className="mfp-popup">{works_list2}</ul>
                            <ul className="mfp-popup">{works_list3}</ul>
                        </div>
                    </article>
                </main>
            </div>
        );
    }
}
export default Works