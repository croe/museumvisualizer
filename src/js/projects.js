import React, {Component} from 'react'
import {Link} from 'react-router';
import {findDOMNode} from "react-dom";
import $ from 'jquery';

import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import pluging from 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import {TweenMax, Power2, TimelineLite} from 'gsap';

import projectData from "./data/projectData.json";
import Slider from "react-slick";

class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {},
            itemIndex: 0
        }
    }

    componentDidMount() {
        let it = this;
        let $window = $(window);
        $('.bg_live').css({'height': $window.innerHeight()});
        $('.layout__container--wrapper').css({'height': $window.innerHeight()});
        // $('.slick-dots').css({top: $('.works_thumb').height() + 20});
        $window.on('resize', () => {
            $('.bg_live').css({'height': $window.innerHeight()});
            $('.layout__container--wrapper').css({'height': $window.innerHeight()});
            // $('.slick-dots').css({top: $('.works_thumb').height() + 20});
        })
    }

    showProjectsHandleClick(e, item, index){
        $('.layout__container--wrapper').addClass('is-active');
        this.setState({
            item: item,
            itemIndex: index
        })
        console.log(item, index);
    }

    backProjectsHandleClick(){
        $('.layout__container--wrapper').removeClass('is-active');

    }

    prevItemHandleClick(){
        let ind;
        if (this.state.itemIndex - 1 >= 0){ ind = this.state.itemIndex - 1;}
        else { ind = projectData.projects.length -1; }
        this.setState({ itemIndex: ind })
    }

    nextItemHandleClick(){
        let ind;
        if (this.state.itemIndex >= projectData.projects.length -1){ ind = 0;}
        else { ind = this.state.itemIndex + 1; }
        this.setState({ itemIndex: ind });
    }

    render() {

        let project_list = projectData.projects.map((item, index) => {
            return (
                <li key={index} onClick={e => this.showProjectsHandleClick(e, item, index)}><h3>{item.name_ja}</h3></li>
            )
        });

        let project_content = () => {
            let data = projectData.projects[this.state.itemIndex];
            let imgsrc = "/images/" + data.proj_img;
            let lectures = data.lec_ja.map((_item, _index) => {
                return (
                    <li key={_index}>{_item} / {data.lec_en[_index]}</li>
                )
            })
            return (
                <div>
                    <img src={imgsrc} alt={data.name_ja}/>
                    <h3 data-en={data.name_en}>{data.name_ja}</h3>
                    <p>{data.prof}</p>
                    <h3 data-en={data.title_en}>{data.title_ja}</h3>
                    <p>{data.exh_ov}</p>
                    <h4>所属教員</h4>
                    <ul>{lectures}</ul>
                </div>
            )
        }

        let project_works = () => {
            let works = projectData.projects[this.state.itemIndex].works.map((_item, _index) => {
                let imgsrc = "/images/" + _item.thumbnail;
                let authorInfo;
                if (_item.author_ja !== undefined){
                    authorInfo = _item.author_ja.map((__item, __index) => {
                        return (
                            <div key={__index} className="author_box">
                                <h5>{_item.author_ja[__index]} / {_item.author_en[__index]}</h5>
                                <p>{_item.author_prof[__index]}</p>
                                <a href={_item.author_web[__index]} target="_blank">{_item.author_web[__index]}</a>
                            </div>
                        )
                    })
                }
                return (
                    <div key={_index}>
                        <img className="works_thumb" src={imgsrc} alt={_item.wname_ja}/>
                        <h4 data-en={_item.wname_en}>{_item.wname_ja}</h4>
                        <p>{_item.wprof}</p>
                        {authorInfo}
                    </div>
                )
            })
            let settings = {
                dots: true,
                arrows: false,
                infinite: true,
                fade: true,
                swipe: false,
                autoplay: true,
                autoplaySpeed: 10000,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
            };
            if (projectData.projects[this.state.itemIndex].works[0] !== "") {
                return (
                    <div className="works">
                        <Slider {...settings}>
                            {works}
                        </Slider>
                    </div>
                )
            }
        }

        let prevButton = () => {
            return (
                <button className="btn_prev" onClick={this.prevItemHandleClick.bind(this)} />
            )
        }

        let nextButton = () => {
            return (
                <button className="btn_next" onClick={this.nextItemHandleClick.bind(this)} />
            )
        }

        return (
            <div className="layout__container page__projects">
                <main className="layout__container--wrapper">
                    <article>
                        <h2 data-subtitle="プロジェクト研究発表">Projects</h2>
                        <div className="layout__container--content">
                            <ul>
                                {project_list}
                            </ul>
                        </div>
                    </article>
                    <article className="projects__wrapper">
                        <button className="btn_back" onClick={this.backProjectsHandleClick.bind(this)}>プロジェクト一覧へ戻る</button>
                        <div className="projects__content">
                            <div className="main">
                                {project_content()}
                                {prevButton()}
                                {nextButton()}
                            </div>
                            {project_works()}
                        </div>
                        <br />
                    </article>
                </main>
            </div>
        );
    }
}

export default Projects