import React from 'react'
import { Link } from "react-router-dom";


export default function Ticket(props) {
    return (
        <div class="ticket-content__box">
          <div class="ticket-content__right">
            <div class="ticket-content__right-right">
            <Link class="ticket-content__link" to={`answer/${props._id}`}>
            {props.title}
          </Link>
              <span class="ticket-content__category">
                <i class="fa fa-ellipsis-v ticket-content__icon"></i>
               {
                   props.departmentSubID
               }
              </span>
            </div>
            <div class="ticket-content__right-left">
              <span class="ticket-content__name">{props.user}</span>
            </div>
          </div>
          <div class="ticket-content__left">
            <div class="ticket-content__left-right">
              <div class="ticket-content__condition">
                <span class="ticket-content__condition-text">
                    {
                        props.answer === 0 ? "پاسخ داده نشده" : "پاسخ داده شده"
                    }
                </span>
              </div>
            </div>
            <div class="ticket-content__left-left">
              <span class="ticket-content__time">{props.createdAt.slice(0, 10)}</span>
            </div>
          </div>
        </div>
      );
}
