import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import {HP, mvs, WP} from '../../assets/config/space';
import {colors} from '../../assets/config/colors';
import fontFamily from '../../assets/config/fontFamily';
import Svgs from '../../assets/graphics/svgs';
import imgs from '../../assets/graphics/imgs';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

export default function SeatSelectionScreen(props?: any) {
  const {title, selectedDate, hall} = props.route.params;
  const zoomableViewRef = createRef<ReactNativeZoomableView>();
  const navigation = useNavigation();
  const [selectedSeats, setSelectedSeats] = useState<any>([]);

  const [seatData, setSeatData] = useState([
    [
      null,
      null,
      null,
      'available',
      'available',
      null,
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      null,
      'available',
      'available',
      null,
      null,
      null,
    ],
    [
      null,
      'reserved',
      'available',
      'reserved',
      'available',
      null,
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      null,
      'available',
      'reserved',
      'available',
      'reserved',
      null,
    ],
    [
      null,
      'available',
      'reserved',
      'available',
      'available',
      null,
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      null,
      'available',
      'available',
      'reserved',
      'available',
      null,
    ],
    [
      null,
      'available',
      'available',
      'reserved',
      'available',
      null,
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      null,
      'available',
      'reserved',
      'available',
      'available',
      null,
    ],
    [
      'reserved',
      'reserved',
      'available',
      'available',
      'available',
      null,
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      null,
      'available',
      'available',
      'available',
      'reserved',
      'reserved',
    ],
    [
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      null,
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      null,
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
    ],
    [
      'reserved',
      'reserved',
      'available',
      'available',
      'available',
      null,
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      null,
      'available',
      'available',
      'available',
      'reserved',
      'reserved',
    ],
    [
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      null,
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      null,
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
    ],
    [
      'reserved',
      'reserved',
      'available',
      'available',
      'available',
      null,
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      'available',
      'available',
      'reserved',
      'reserved',
      null,
      'available',
      'available',
      'available',
      'reserved',
      'reserved',
    ],
    [
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      null,
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'available',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      null,
      'VIP',
      'VIP',
      'VIP',
      'VIP',
      'VIP',
    ],
  ]);
  const handleSeatPress = (rowIndex: number, seatIndex: number) => {
    setSeatData(prevData =>
      prevData.map((row, i) =>
        row.map((seat, j) => {
          if (i === rowIndex && j === seatIndex) {
            if (seat === 'available' || seat === 'VIP') {
              // Add to selected seats when selecting
              setSelectedSeats((prev: any) => [...prev, {rowIndex, seatIndex, isVip: seat === 'VIP'}]);
              return 'selected';
            } else if (seat === 'selected') {
              // Remove from selected seats when deselecting
              setSelectedSeats((prev: any) =>
                prev.filter(
                  (s: any) =>
                    !(s.rowIndex === rowIndex && s.seatIndex === seatIndex),
                ),
              );
              // Return to previous state (available or VIP) when deselecting
              const prevState = prevData[rowIndex][seatIndex];
              return prevState === 'VIP' ? 'VIP' : 'available';
            }
          }
          return seat;
        }),
      ),
    );
  };

  const handleRemoveSelectedSeat = (rowIndex: number, seatIndex: number) => {
    setSeatData(prevData =>
      prevData.map((row, i) =>
        row.map((seat, j) => {
          if (i === rowIndex && j === seatIndex) {
            return 'available';
          }
          return seat;
        }),
      ),
    );
    // Also remove from selected seats
    setSelectedSeats((prev: any) =>
      prev.filter(
        (s: any) => !(s.rowIndex === rowIndex && s.seatIndex === seatIndex),
      ),
    );
  };

  const renderSeat = (seat: any, rowIndex: number, seatIndex: number) => {
    if (seat === null)
      return <View key={`${rowIndex}-${seatIndex}`} style={styles().gap} />;

    let seatColor;
    switch (seat) {
      case 'reserved':
        seatColor = colors.disabledGrey;
        break;
      case 'selected':
        seatColor = colors.lemonCurry;
        break;
      case 'VIP':
        seatColor = colors.liberty;
        break;
      default:
        seatColor = colors.MayaBlue;
    }

    return (
      <TouchableOpacity
        key={`${rowIndex}-${seatIndex}-${seat}`}
        style={styles().seatMargin}
        disabled={seat === 'reserved'}
        onPress={() => handleSeatPress(rowIndex, seatIndex)}>
        <Svgs.seat
          width={styles().seatSize.width}
          height={styles().seatSize.height}
          color={seatColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles().mainCont}>
        <CustomHeader
          IconLeft={<Svgs.backArrow color={colors.black} />}
          detail={{name: title, description: 'In Theaters ' + 'May 21, 2025'}}
          IconRight={<></>}
        />
        <View style={styles().viewCont}>
          <ReactNativeZoomableView
            ref={zoomableViewRef}
            maxZoom={30}
            contentWidth={HP(100)}
            contentHeight={HP(100)}>
            <Image style={styles().screen} source={imgs.screen} />
            <Text style={styles().screenTxt}>SCREEN</Text>

            <FlatList
              scrollEnabled={false}
              data={seatData}
              renderItem={({item, index: rowIndex}) => (
                <View style={styles().row}>
                  <Text style={styles().rowNumber}>{rowIndex + 1}</Text>
                  {item.map((seat, seatIndex) =>
                    renderSeat(seat, rowIndex, seatIndex),
                  )}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles().seatContainer}
            />
          </ReactNativeZoomableView>

          <View style={styles().zoomBtnsCont}>
            <TouchableOpacity
              style={styles().zoomBtn}
              onPress={() => zoomableViewRef.current!.zoomBy(0.5)}>
              <Svgs.plus />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles().zoomBtn}
              onPress={() => zoomableViewRef.current!.zoomBy(-0.5)}>
              <Svgs.minus />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles().bottomView}>
          <View style={styles().seatRow}>
            <View style={styles().seatColumn}>
              <View style={styles().seatCont}>
                <Svgs.seat color={colors.lemonCurry} />
                <Text style={styles().seatTxt}>Selected</Text>
              </View>
              <View style={styles().seatCont}>
                <Svgs.seat color={colors.liberty} />
                <Text style={styles().seatTxt}>VIP (150 $)</Text>
              </View>
            </View>

            <View style={styles().seatColumn}>
              <View style={styles().seatCont}>
                <Svgs.seat color={colors.disabledGrey} />
                <Text style={styles().seatTxt}>Not available</Text>
              </View>

              <View style={styles().seatCont}>
                <Svgs.seat color={colors.MayaBlue} />
                <Text style={styles().seatTxt}>Regular (50 $)</Text>
              </View>
            </View>
          </View>

          <ScrollView horizontal>
            {selectedSeats.map((item: any, index: number) => {
              return (
                <View style={styles().selectedSeatCont}>
                  <Text style={styles().selectedSeatTxt}>
                    {item.seatIndex} /
                    <Text style={styles().selectedSeatTxt2}>
                      {item.rowIndex + 1} row
                    </Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedSeats((prevSelectedSeats: any) =>
                        prevSelectedSeats.filter((_, i) => i !== index),
                      );
                      handleRemoveSelectedSeat(item.rowIndex, item.seatIndex);
                    }}>
                    <Svgs.cross />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles().priceBtnCont}>
            <View style={styles().totalCont}>
              <Text style={styles().totalTxt}>TotalPrice</Text>
              <Text style={styles().amount}>$ {selectedSeats.length * 50}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.5} style={styles().payBtn}>
              <Text style={styles().payBtnTxt}>Proceed to Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = (props?: any) =>
  StyleSheet.create({
    seatMargin: {
      marginRight: mvs(4),
    },
    seatSize: {
      width: mvs(10),
      height: mvs(10),
    },
    headerCont: {
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontFamily: fontFamily.medium,
      color: colors.text_black,
      lineHeight: 20,
    },
    date: {
      fontSize: 12,
      fontFamily: fontFamily.medium,
      color: colors.MayaBlue,
    },
    mainCont: {
      flex: 1,
    },
    viewCont: {
      flexShrink: 1,
      height: HP(53),
      width: WP(100),
      backgroundColor: colors.white,
    },
    screen: {width: '90%', height: '10%', resizeMode: 'contain'},
    screenTxt: {
      top: HP(-3),
      fontFamily: fontFamily.medium,
      color: colors.gray,
      fontSize: 8,
    },
    seatContainer: {
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 5,
    },
    rowNumber: {
      fontSize: 5,
      color: colors.gray,
      fontFamily: fontFamily.semi_bold,
      alignSelf: 'center',
      marginRight: 10,
    },
    seat: {
      width: 7,
      height: 7,
      margin: 2,
    },
    gap: {
      width: 7,
      height: 7,
      margin: 2,
    },
    zoomBtnsCont: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
      alignSelf: 'flex-end',
      bottom: HP(2),
      right: WP(3), //
    },
    zoomBtn: {
      backgroundColor: colors.white,
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    zoomImg: {width: 10, height: 10},
    bottomView: {
      width: WP(90),
      alignSelf: 'center',
      marginTop: HP(3.1),
      flex: 1,paddingBottom:HP(3)
    },
    seatRow: {
      flexDirection: 'row',
      gap: 40,
      marginBottom: HP(1.5),
    },
    seatColumn: {
      gap: 20,
    },
    seatCont: {flexDirection: 'row', gap: 10},
    seatImg: {width: 17, height: 16, tintColor: props},
    seatTxt: {
      fontSize: 12,
      fontFamily: fontFamily.medium,
      color: colors.gray,
    },
    selectedSeatCont: {
      marginTop: HP(2),
      backgroundColor: colors.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: WP(30),
      height: HP(5),
      borderRadius: 10,
      marginRight: 10,
    },
    selectedSeatTxt: {
      fontSize: 14,
      fontFamily: fontFamily.medium,
      color: colors.gray,
    },
    selectedSeatTxt2: {
      fontSize: 10,
      fontFamily: fontFamily.regular,
      color: colors.gray,
    },
    crossImg: {width: 20, height: 20},
    priceBtnCont: {
      marginTop: HP(3),
      flexDirection: 'row',
      gap: 10,
    },
    totalCont: {
      backgroundColor: colors.white,
      borderRadius: 10,
      width: WP(25),
      height: HP(6.5),
      paddingLeft: WP(5),
      justifyContent: 'center',
    },
    totalTxt: {
      fontSize: 10,
      fontFamily: fontFamily.regular,
      color: colors.gray,
    },
    amount: {
      fontSize: 16,
      color: colors.gray,
      fontFamily: fontFamily.semi_bold,
    },
    payBtn: {
      flex: 1,
      height: HP(6.5),
      backgroundColor: colors.MayaBlue,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    payBtnTxt: {
      fontSize: 16,
      color: colors.white,
      fontFamily: fontFamily.semi_bold,
    },
  });
