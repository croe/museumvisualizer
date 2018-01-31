import React, {Component} from 'react'
import {Link} from 'react-router';
import {findDOMNode} from "react-dom";
import $ from 'jquery';

import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import pluging from 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import {TweenMax, Power2, TimelineLite} from 'gsap';

import eventData from "./data/eventData.json";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: eventData.date3,
            item: {},
            itemIndex: 3,
            tabSelected: 2,
            tabIndex: ["22日(木)","23日(金)","24日(土)","25日(日)"]
        }
    }

    componentDidMount() {
        let it = this;
        let $window = $(window);
        $('.bg_live').css({'height': $window.innerHeight()});
        $('.layout__container').css({'height': $window.innerHeight()});
        $window.on('resize', () => {
            $('.bg_live').css({'height': $window.innerHeight()});
            $('.layout__container').css({'height': $window.innerHeight()});
        })
    }

    tabHeadHandleClick(e, index) {
        if (index === 0) {
            this.state.data = eventData.date1
        }
        else if (index === 1) {
            this.state.data = eventData.date2
        }
        else if (index === 2) {
            this.state.data = eventData.date3
        }
        else if (index === 3) {
            this.state.data = eventData.date4
        }
        this.setState({
            data: this.state.data,
            itemIndex: 0,
            tabSelected: index
        })
    }

    showTabContentHandleClick(e, item, index) {

        $('.layout__container--wrapper').addClass('is-active');
        $("html, body").animate({scrollTop: 0}, 500, "swing");
        this.setState({
            item: item,
            itemIndex: index
        })
    }

    backTabListHandleClick(){
        $('.layout__container--wrapper').removeClass('is-active');
    }

    prevItemHandleClick(){
        let ind;
        if (this.state.itemIndex - 1 > 0){ ind = this.state.itemIndex - 1;}
        else { ind = 0; }
        this.setState({ itemIndex: ind })
    }

    nextItemHandleClick(){
        let ind;
        if (this.state.itemIndex >= this.state.data.length -1){ ind = this.state.itemIndex;}
        else { ind = this.state.itemIndex + 1; }
        this.setState({ itemIndex: ind })
    }

    createMarkup(content){
        return {__html: content};
    }

    render() {

        let tabList = this.state.data.map((item, index) => {
            let guest = "";
            let level = "level" + item.level;
            if (item.guest) {
                // guest = "ゲスト：" + item.guest + "（" + item.guest_posi + "）";
                guest = "ゲスト：" + item.guest;
            }
            return (
                <li key={index} onClick={e => this.showTabContentHandleClick(e, item, index)}>
                    <p>
                        <span className="label">{item.label}</span>
                        <span className="date">{item.date} </span>
                        <span className="place">{item.place} </span>
                        <span className="guest">{guest}</span>
                    </p>
                    <h3 className={level}>{item.title}</h3>
                </li>
            )
        });

        let tabHead = this.state.tabIndex.map((item, index) => {
            let cls = "";
            if (index === this.state.tabSelected) {
                cls = "is-active";
            }
            return (
                <li className={cls} key={index} onClick={e => this.tabHeadHandleClick(e, index)}>{this.state.tabIndex[index]}</li>
            )
        })

        let tabContent = () => {
            let data = this.state.data[this.state.itemIndex];
            let imgsrc = "/images/" + data.event_img;
            if (data.guest) {
                if (data.guest_prof){
                    return (
                        <div className="event_detail">
                            <div className="event_head">
                                <p><span className="label">{data.label}</span><span className="date">{data.date}</span><span className="place">{data.place}</span></p>
                                <h4>{data.title}</h4>
                                <p>ゲスト：{data.guest}({data.guest_posi})</p>
                                {prevButton()}
                                {nextButton()}
                            </div>
                            <div className="event_content">
                                <p  dangerouslySetInnerHTML={this.createMarkup(data.content)} />
                            </div>
                            <div className="event_guest">
                                <div className="prof_img">
                                    <img src={imgsrc} alt={data.guest}/>
                                </div>
                                <div className="profile">
                                    <h5>{data.guest}</h5>
                                    <p  dangerouslySetInnerHTML={this.createMarkup(data.guest_prof)} />
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="event_detail">
                            <div className="event_head">
                                <p><span className="label">{data.label}</span><span className="date">{data.date}</span><span className="place">{data.place}</span></p>
                                <h4>{data.title}</h4>
                                <p>ゲスト：{data.guest}({data.guest_posi})</p>
                                {prevButton()}
                                {nextButton()}
                            </div>
                            <div className="event_content no-guest">
                                <div className="event_img">
                                    <img src={imgsrc} alt={data.title}/>
                                </div>
                                <div className="content">
                                    <p  dangerouslySetInnerHTML={this.createMarkup(data.content)} />
                                </div>
                            </div>
                        </div>
                    )
                }
            } else {
                return (
                    <div className="event_detail">
                        <div className="event_head">
                            <p><span className="label">{data.label}</span><span className="date">{data.date}</span><span className="place">{data.place}</span></p>
                            <h4>{data.title}</h4>
                            {prevButton()}
                            {nextButton()}
                        </div>
                        <div className="event_content no-guest">
                            <div className="event_img">
                                <img src={imgsrc} alt={data.title}/>
                            </div>
                            <div className="content">
                                <p  dangerouslySetInnerHTML={this.createMarkup(data.content)} />
                            </div>
                        </div>
                    </div>
                )
            }
        }

        let prevButton = () => {
            if (this.state.itemIndex !== 0){
                return (
                    <button className="btn_prev" onClick={this.prevItemHandleClick.bind(this)} />
                )
            }
        }

        let nextButton = () => {
            if (this.state.itemIndex !== this.state.data.length - 1){
                return (
                    <button className="btn_next" onClick={this.nextItemHandleClick.bind(this)} />
                )
            }
        }

        return (
            <div className="layout__container page__event">
                <main className="layout__container--wrapper">
                    <article>
                        <h2 data-subtitle="イベント">Event</h2>
                        <div className="tab">
                            <div className="tab__head">
                                <ul>
                                    {tabHead}
                                </ul>
                            </div>
                            <div className="tab__content">
                                <ul>
                                    {tabList}
                                </ul>
                            </div>
                        </div>
                    </article>
                    <article className="layout__container--content">
                        <h2>{this.state.tabIndex[this.state.tabSelected]}</h2>
                        <div className="btn_back" onClick={this.backTabListHandleClick.bind(this)}>タイムテーブルへ戻る</div>
                        {tabContent()}
                    </article>
                </main>
            </div>
        );
    }
}

export default Event