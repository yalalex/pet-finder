import React, { useEffect } from 'react';
import nophoto from '../../images/nophoto.jpg';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  setCurrent,
  clearCurrent,
  showAdForm,
  showMarkedAd
} from '../../actions/adActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const AdItem = ({
  auth: { user, lang },
  ads: { ads },
  ad,
  setCurrent,
  showAdForm,
  showMarkedAd
}) => {
  useEffect(() => {
    M.AutoInit();
  });

  const { type, pet, address, phone, photo, description, city, date } = ad;

  const activeAd = ad => {
    setCurrent(ad);
    showAdForm();
  };

  return (
    <div className='row animated fadeIn'>
      <div className='card'>
        <div className='card-image'>
          <img src={photo ? photo : nophoto} alt='' />
          <span className='card-title red-text'>
            {lang === 'en'
              ? type.toUpperCase()
              : type === 'lost'
              ? 'ПОТЕРЯН'
              : 'НАЙДЕН'}
          </span>
          {user !== null && ads.length > 0 && user._id === ad.user && (
            <a
              className='btn-floating halfway-fab waves-effect waves-light deep-orange darken-2'
              onClick={() => activeAd(ad)}
              href='#ad-form'
            >
              <i className='material-icons'>edit</i>
            </a>
          )}
        </div>
        <div
          className='card-content col s12 card-style hoverable pointer'
          style={{
            paddingLeft: '0',
            paddingRight: '0',
            cursor: 'pointer'
          }}
          onClick={() => showMarkedAd(ad._id)}
        >
          <div className='col s4 blue-grey-text'>
            {lang === 'en' ? 'Who:' : 'Кто:'}
          </div>
          <div className='col s8'>
            {pet.charAt(0).toUpperCase() + pet.slice(1)}
          </div>
          <div className='col s4 blue-grey-text'>
            {lang === 'en' ? 'Where:' : 'Где:'}
          </div>
          <div className='col s8'>
            {city.charAt(0).toUpperCase() +
              city.slice(1) +
              ', ' +
              address.charAt(0).toUpperCase() +
              address.slice(1)}
          </div>
          <div className='col s4 blue-grey-text'>
            {lang === 'en' ? 'When:' : 'Когда:'}
          </div>
          <div className='col s8'>
            {lang === 'en' ? moment(date).format('MM/DD/YYYY')
              : moment(date).format('DD/MM/YYYY')}
          </div>
          <div className='col s4 blue-grey-text'>
            {lang === 'en' ? 'Phone:' : 'Телефон:'}
          </div>
          <div className='col s8'>{phone}</div>
          <div className='col s4 blue-grey-text'>
            {lang === 'en' ? 'About:' : 'Описание:'}
          </div>
          <div className='col s8'>
            {description
              ? description.charAt(0).toUpperCase() + description.slice(1)
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  ads: state.ads
});

export default connect(mapStateToProps, {
  setCurrent,
  clearCurrent,
  showAdForm,
  showMarkedAd
})(AdItem);
