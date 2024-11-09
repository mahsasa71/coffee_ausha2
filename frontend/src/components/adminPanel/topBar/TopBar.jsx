import React, { useEffect, useState } from "react";


export default function TopBar() {

    const [adminInfo, setAdminInfo] = useState({})
    const [adminNotifications, setAdminNotifications] = useState([]);
    const [isShowNotificationsBox, setIsShowNotificationsBox] = useState(false);

    useEffect(() => {
      const localStorageData = JSON.parse(localStorage.getItem("user"));
      fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setAdminInfo(data);
          setAdminNotifications(data.notifications);
        });
    }, [seeNotification]);
    function seeNotification (notficationID) {
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        fetch(`http://localhost:4000/v1/notifications/see/${notficationID}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorageData.token}`
          }
        })
          .then(res => res.json())
          .then(err => {
            console.log(err);
          })
      }
    
  return (
<div class="container-fluid">
      <div class="container">
        <div
          class={`home-header ${
            isShowNotificationsBox && "active-modal-notfication"
          }`}
        >
          <div class="home-right">
            {/* <div class="home-searchbar">
              <input type="text" class="search-bar" placeholder="جستجو..." />
            </div> */}
            <div class="home-notification">
              <button
                type="button"
                onMouseEnter={() => setIsShowNotificationsBox(true)}
              >
                <i class="far fa-bell"></i>
              </button>
            </div>
            <div
              class="home-notification-modal"
              onMouseEnter={() => setIsShowNotificationsBox(true)}
              onMouseLeave={() => setIsShowNotificationsBox(false)}
            >
              <ul class="home-notification-modal-list">
              {adminNotifications.length === 0 ? (
                  <li class="home-notification-modal-item">
                    نوتیفکیشنی برای نمایش وجود ندارد
                  </li>
                ) : (
                  <>
                    {adminNotifications.map((notification) => (
                      <li class="home-notification-modal-item">
                        <span class="home-notification-modal-text">
                          {notification.msg}
                        </span>
                        <label class="switch">
                          <a
                            href="javascript:void(0)"
                            onClick={() => seeNotification(notification._id)}
                          >
                            دیدم
                          </a>
                        </label>
                      </li>
                    ))}
                  </>
                )}
              </ul>
              
            </div>
          </div>
          <div class="home-left">
            <div class="home-profile">
              <div class="home-profile-image">
                <a href="#">
                  <img src={adminInfo.profile} alt="" />
                </a>
              </div>
              <div class="home-profile-name">
                <a href="#">{adminInfo.name}</a>
              </div>
              <div class="home-profile-icon">
                <i class="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
     
}
