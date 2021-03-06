import React, { useEffect } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import AdMark from './AdMark';
import { getAds } from '../../actions/adActions';
import { connect } from 'react-redux';

const MapComp = ({ ads: { ads, filtered, adForm }, getAds }) => {
  useEffect(() => {
    getAds();
    // eslint-disable-next-line
  }, []);

  return (
    <YMaps>
      <div className='map' style={{ display: adForm ? 'none' : 'block' }}>
        <Map
          defaultState={{
            center: [25, 0],
            zoom: 2
          }}
          width='100%'
          height='100%'
        >
          {ads !== null
            ? filtered !== null
              ? filtered.map(ad => <AdMark key={ad._id} ad={ad} />)
              : ads.map(ad => <AdMark key={ad._id} ad={ad} />)
            : null}
        </Map>
      </div>
    </YMaps>
  );
};

const mapStateToProps = state => ({
  ads: state.ads
});

export default connect(mapStateToProps, { getAds })(MapComp);
