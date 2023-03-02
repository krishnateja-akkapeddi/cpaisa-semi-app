import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import SVGIcon from '../../../utility/svg/SVGIcon';
import Spacer from '../../layout/Spacer';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import ImageView from '../../image/ImageView';
import Fonts from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import Carousel from '../../carousel/Carousel';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {InvoiceDetail} from '../../../models/interfaces/InvoiceDetailResponse';
import AppLoader from '../../indicator/AppLoader';

const InvoiceDetailHeader = (props: {
  invoice: InvoiceDetail;
  loading: boolean;
}) => {
  const {invoice} = props;

  // const barItems: {title: string; date: string}[] = [
  //   {title: 'Upload Date', date: invoice.uploaded_at},
  //   {title: ' Processed Date', date: invoice.uploaded_at},
  //   {title: 'Approval Date', date: ''},
  // ];

  console.log('DEBUG_RAJ', invoice.invoice_items);

  const renderItem = useCallback(
    (item: string) => {
      return (
        <View style={styles.imageView}>
          <ImageView
            style={{height: hp('25%')}}
            source={{
              uri: invoice?.image_url,
            }}
          />
        </View>
      );
    },
    [invoice],
  );

  return (
    <View>
      {props.loading ? (
        <AppLoader loading={true} />
      ) : (
        <View>
          <View style={styles.invoiceDetail}>
            <View style={styles.starMark}>
              <Text>
                <SVGIcon name="mark" size={hp('3%')} />
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.detailView}>
                <View style={styles.rowView}>
                  <View style={[styles.expand, {alignItems: 'flex-start'}]}>
                    <Text style={styles.titleStyle}>Invoice</Text>
                    <Text style={styles.valueStyle}>{`#${invoice.id}`}</Text>
                  </View>
                  <View style={styles.expand}>
                    <Text style={styles.titleStyle}>Uploaded On</Text>
                    <Text style={styles.valueStyle}>{invoice.uploaded_at}</Text>
                  </View>
                  <View style={styles.expand}></View>
                </View>
                <Spacer height={hp('2%')} />
                <View style={styles.rowView}>
                  <View style={[styles.expand, {alignItems: 'flex-start'}]}>
                    <Text style={styles.titleStyle}>Customer Name</Text>
                    <Text style={styles.valueStyle}>
                      {invoice.customer_name
                        ? invoice.customer_name
                        : AppLocalizedStrings.noData}
                    </Text>
                  </View>
                  <View style={styles.expand}>
                    <Text style={styles.titleStyle}>Ammount</Text>
                    <Text style={styles.valueStyle}>
                      ₹{' '}
                      {invoice.total_amount
                        ? invoice.total_amount
                        : AppLocalizedStrings.noData}
                    </Text>
                  </View>
                  <View style={[styles.expand, {alignItems: 'flex-end'}]}>
                    <Text style={styles.titleStyle}>Invoice Date</Text>
                    <Text style={styles.valueStyle}>
                      {invoice.invoice_date
                        ? invoice.invoice_date
                        : AppLocalizedStrings.noData}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <Spacer height={hp(1.5)} />
            {/* 
            //todo: next_version_implememtation
            <Carousel items={['1']} renderItem={renderItem} /> 
            */}
            <View style={styles.imageView}>
              <ImageView
                style={{height: hp('25%')}}
                source={{
                  uri: invoice?.image_url,
                }}
              />
            </View>
            <Spacer height={hp(1.5)} />
            {/* <View>
              <ProgressBar
            items={barItems}
            completedSteps={1}
            style={{paddingHorizontal: 0, width: '100%'}}
          />
            </View> */}
          </View>
          <View style={styles.lineView} />
          {invoice.invoice_items?.length !== 0 && (
            <View style={styles.bottomBar}>
              <View style={{flex: 1}}>
                <Text style={styles.barTitleText}>Products</Text>
              </View>
              <Spacer width={wp(5)} />

              <Text style={styles.barTitleText}>Points</Text>
              <Spacer width={wp(14)} />
              <Text style={{...styles.barTitleText, marginRight: wp(3)}}>
                Qty
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default InvoiceDetailHeader;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },

  astraText: {
    fontSize: Fonts.getFontSize('headline4'),
    color: '#474747',
    fontFamily: Fonts.getFontFamily('Regular'),
  },
  addessText: {
    fontSize: Fonts.getFontSize('headline6'),
    color: '#474747',
    fontFamily: Fonts.getFontFamily('Regular'),
  },

  iconBox: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: wp('2%'),
  },
  supportText: {
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.primary,
    fontFamily: Fonts.getFontFamily('Regular'),
  },
  invoiceDetail: {
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 10,
    padding: hp('2%'),
    marginVertical: 20,
    position: 'relative',
  },
  starMark: {
    position: 'absolute',
    zIndex: 10,
    top: -1,
    right: 15,
  },
  detailView: {
    flex: 1,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.getFontSize('headline6'),
    color: '#7F7F7F',
  },
  valueStyle: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline5'),
    color: Colors.black,
    marginTop: hp('0.3%'),
  },
  imageView: {
    borderColor: '#BEBED3',
    borderWidth: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    marginVertical: hp('2%'),
    paddingHorizontal: 4,
  },
  lineView: {
    borderTopWidth: 1,
    borderColor: '#D9D9D9',
  },
  barTitleText: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.getFontSize('headline3'),
    color: Colors.black,
  },
  expand: {
    flex: 1,
    alignItems: 'center',
  },
});
