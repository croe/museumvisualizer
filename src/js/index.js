import React, {Component} from 'react'
import {Link} from 'react-router';
import {findDOMNode} from "react-dom";
import $ from 'jquery';
import Modal from 'react-modal'


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      rawData: [],
      parseData: [],
      museumInfoModalIsOpen: false
    }
  }

  componentWillMount(){
    let it = this;
    $.ajax({
      url: "https://sheets.googleapis.com/v4/spreadsheets/16vTGQq9iPJ9aKHtqDsipZid87A8EMx246s3BvY9RPSI/values/B4:Z444?key=AIzaSyBZHoIkxG4HFEflbPr1ha-42IDLLyX7ZuQ",
      dataType: 'json'
    }).done(function (data) {
      let arr = [];
      data.values.forEach((item)=> {
        let _item = {};
        if (item[0] !== undefined){
          _item.mname = item[0];
          if (item[1] === "◯") {_item.goods = 1;}
          else if (item[1] === "△"){_item.goods = 2;}
          else {_item.goods = 0;}

          if (item[2] === "◯") {_item.shop = 1;}
          else if (item[2] === "△"){_item.shop = 2;}
          else {_item.shop = 0;}

          if (item[3] === "◯") {_item.order = 1;}
          else if (item[3] === "△"){_item.order = 2;}
          else {_item.order = 0;}

          if (item[4] === "◯") {_item.free = 1;}
          else if (item[4] === "△"){_item.free = 2;}
          else {_item.free = 0;}
          _item.desc = item[5];
          _item.sname = item[6];
          _item.gname = item[7];
          _item.item = item[8];

          if (item[9] === "◯") {_item.item1 = 1;}
          else {_item.item1 = 0;}

          if (item[10] === "◯") {_item.item2 = 1;}
          else {_item.item2 = 0;}

          if (item[11] === "◯") {_item.item3 = 1;}
          else {_item.item3 = 0;}

          if (item[12] === "◯") {_item.item4 = 1;}
          else {_item.item4 = 0;}

          if (item[13] === "◯") {_item.item5 = 1;}
          else {_item.item5 = 0;}

          if (item[14] === "◯") {_item.item6 = 1;}
          else {_item.item6 = 0;}

          if (item[15] === "◯") {_item.item7 = 1;}
          else {_item.item7 = 0;}

          if (item[16] === "◯") {_item.item8 = 1;}
          else {_item.item8 = 0;}

          if (item[17] === "◯") {_item.item9 = 1;}
          else {_item.item9 = 0;}

          _item.apply = item[18];
          _item.apply1 = item[19];
          _item.sns = item[20];
          _item.sns1 = item[21];

          if (item[22] === "◯") {_item.rest = 1;}
          else {_item.rest = 0;}

          _item.rest1 = item[23];
          if (item[24] !== undefined){_item.est = parseInt(item[24].slice(0,4));}
          else {_item.est = 0}

          arr.push(_item);
        }
      })
      console.log(arr, data.values)

      it.setState({
        rawData: data.values,
        parseData: arr,
        isLoaded: true
      })

    }).fail(()=>{
      console.log("ajax failed...")
    })
  }

  componentDidMount(){
    let it = this;
    /**
     * Anchor link Animation
     */
    $("a[href^='#']").on('click', function () {
        let speed = 500,
            href = $(this).attr("href"),
            target = $(href == "#" || href == "" ? 'html' : href),
            position = target.offset().top;
        $("html, body").animate({scrollTop: position}, speed, "swing");
        return false;
    });

  }

  openInfoModal(){
    this.setState({
      museumInfoModalIsOpen: true
    })
  }

  closeInfoModal(){
    this.setState({
      museumInfoModalIsOpen: false
    })
  }

  render() {

    let AllMuseumList = this.state.rawData.map((item, index) => {
      if (this.state.isLoaded){
        let info = item.map((_item, _index) => {
          return (
            <li key={_index}>{_item}</li>
          )
        })
        return (
          <li key={index}>
            <ul className="museum__list--item">{info}</ul>
          </li>
        )
      }
    })


    return (
      <div className="layout__container page__index">
        <main className="layout__container--wrapper">
          <button onClick={this.openInfoModal.bind(this)}>開く</button>
          <ul className="museum__list--all">
            {AllMuseumList}
          </ul>
        </main>
        <Modal
          isOpen={this.state.museumInfoModalIsOpen}
          style={customStyles}
          contentLabel="Info"
        >
          <h1>美術館</h1>
          <button onClick={this.closeInfoModal.bind(this)}>閉じる</button>
        </Modal>
      </div>
    );
  }
}

export default Index

const customStyles = {
  overlay: {background: 'rgba(0,0,0, .4)'},
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '72%',//openしているコンテンツの幅を変える,
    zIndex: '100'
  }
};