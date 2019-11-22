import React, { Fragment, useState, useEffect } from 'react';
import {
  addAd,
  updateAd,
  clearCurrent,
  deleteAd,
  hideAdForm
} from '../../actions/adActions';
import { connect } from 'react-redux';

const AdForm = ({
  ads: { current, adForm },
  auth: { lang },
  addAd,
  updateAd,
  clearCurrent,
  deleteAd,
  hideAdForm
}) => {
  useEffect(() => {
    if (current !== null) {
      setAd(current);
    } else {
      setAd({
        type: '',
        pet: '',
        address: '',
        photo: '',
        phone: '',
        description: '',
        coords: {}
      });
    }
  }, [current]);

  const [ad, setAd] = useState({
    type: '',
    pet: '',
    address: '',
    photo: '',
    phone: '',
    description: '',
    coords: {}
  });

  const { _id, type, pet, address, photo, phone, description } = ad;

  const onChange = e => setAd({ ...ad, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addAd(ad);
    } else {
      updateAd(ad);
    }
    clearCurrent();
    hideAdForm();
  };

  const clearAll = () => {
    clearCurrent();
  };

  const closeAdForm = () => {
    clearCurrent();
    hideAdForm();
  };

  const onDelete = () => {
    deleteAd(_id);
    clearCurrent();
    hideAdForm();
  };

  return adForm ? (
    <div
      className='card-style'
      style={{
        padding: '2rem'
      }}
      id='ad-form'
    >
      <h5 className='center'>
        {current
          ? lang === 'en'
            ? 'Edit Ad'
            : 'Редактировать объявление'
          : lang === 'en'
          ? 'Add ad'
          : 'Разместить объявление'}
      </h5>
      <div className='row s12' style={{ margin: '2rem' }}>
        <div className='col s6'>
          <label>
            <input
              className='with-gap'
              type='radio'
              name='type'
              value='lost'
              checked={type === 'lost'}
              onChange={onChange}
            />
            <span>{lang === 'en' ? 'Lost' : 'Пропал'}</span>
          </label>
        </div>
        <div className='col s6'>
          <label>
            <input
              className='with-gap'
              type='radio'
              name='type'
              value='found'
              checked={type === 'found'}
              onChange={onChange}
            />
            <span>{lang === 'en' ? 'Found' : 'Найден'}</span>
          </label>
        </div>
      </div>

      <div className='row'>
        <div className='input-field'>
          <input
            placeholder={
              lang === 'en'
                ? 'Pet type (dog/cat/...)'
                : 'Вид животного (собака/кот/...)'
            }
            type='text'
            name='pet'
            value={pet}
            onChange={onChange}
            required
          />
          <label htmlFor='pet' className='active'>
            {lang === 'en' ? 'Pet type' : 'Вид животного'}
          </label>
        </div>
      </div>

      <div className='row'>
        <div className='input-field'>
          <input
            placeholder={
              lang === 'en'
                ? 'Approximate address where lost/found'
                : 'Приблизительный адрес пропажи/находки'
            }
            type='text'
            name='address'
            value={address}
            onChange={onChange}
            required
          />
          <label htmlFor='address' className='active'>
            {lang === 'en' ? 'Address' : 'Адрес'}
          </label>
        </div>
      </div>

      <div className='row'>
        <div className='input-field'>
          <input
            placeholder={
              lang === 'en' ? 'Your phone number' : 'Ваш контактный номер'
            }
            type='text'
            name='phone'
            value={phone}
            onChange={onChange}
            required
          />
          <label htmlFor='phone' className='active'>
            {lang === 'en' ? 'Phone' : 'Телефон'}
          </label>
        </div>
      </div>

      <div className='row'>
        <div className='input-field'>
          <textarea
            placeholder={
              lang === 'en'
                ? 'Description/additional information'
                : 'Описание/дополнительная информация'
            }
            name='description'
            value={description}
            onChange={onChange}
            className='materialize-textarea'
          ></textarea>
          <label htmlFor='description' className='active'>
            {lang === 'en' ? 'Description' : 'Описание'}
          </label>
        </div>
      </div>

      <div className='row'>
        <div className='input-field'>
          <input
            placeholder={
              lang === 'en'
                ? 'Photo URL of the pet'
                : 'URL-адрес фотографии питомца'
            }
            type='text'
            name='photo'
            value={photo}
            onChange={onChange}
          />
          <label htmlFor='photo' className='active'>
            {lang === 'en' ? 'Photo' : 'Фото'}
          </label>
        </div>
      </div>

      <div className='center'>
        <a
          href='#!'
          onClick={onSubmit}
          className='waves-effect waves-light btn-small green'
          style={{ margin: '0.2rem' }}
        >
          {current
            ? lang === 'en'
              ? 'Update'
              : 'Обновить'
            : lang === 'en'
            ? 'Post'
            : 'Разместить'}
        </a>
        <a
          href='#!'
          onClick={closeAdForm}
          className='waves-effect waves-light btn-small blue'
          style={{ margin: '0.2rem' }}
        >
          {lang === 'en' ? 'Close' : 'Закрыть'}
        </a>
        {current && (
          <Fragment>
            <a
              href='#!'
              onClick={clearAll}
              className='waves-effect waves-light btn-small orange darken-2'
              style={{ margin: '0.2rem' }}
            >
              {lang === 'en' ? 'Clear' : 'Очистить'}
            </a>
            <a
              href='#!'
              onClick={onDelete}
              className='waves-effect waves-light btn-small red'
              style={{ margin: '0.2rem' }}
            >
              {lang === 'en' ? 'Delete' : 'Удалить'}
            </a>
          </Fragment>
        )}
      </div>
    </div>
  ) : null;
};

const mapStateToProps = state => ({
  ads: state.ads,
  auth: state.auth
});

export default connect(mapStateToProps, {
  addAd,
  updateAd,
  clearCurrent,
  deleteAd,
  hideAdForm
})(AdForm);
