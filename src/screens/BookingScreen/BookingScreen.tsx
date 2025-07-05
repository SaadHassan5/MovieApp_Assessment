import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {generateDates, generateRandomTime} from '../../utils/dateTimeGenerator';
import {HP, WP} from '../../assets/config/space';
import {colors} from '../../assets/config/colors';
import fontFamily from '../../assets/config/fontFamily';
import imgs from '../../assets/graphics/imgs';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import Svgs from '../../assets/graphics/svgs';

export default function BookingScreen(props: any) {
  const {title, date} = props.route.params;
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedHall, setSelectedHall] = useState<any>(null);
  const [disabled, setDisabled] = useState(true);
  const [halls] = useState([
    {
      time: generateRandomTime(),
      hallNo: 1,
      statingPrice: 50,
      bonus: 2500,
    },
    {
      time: generateRandomTime(),
      hallNo: 3,
      statingPrice: 50,
      bonus: 2500,
    },
    {
      time: generateRandomTime(),
      hallNo: 4,
      statingPrice: 50,
      bonus: 2500,
    },
    {
      time: generateRandomTime(),
      hallNo: 2,
      statingPrice: 50,
      bonus: 2500,
    },
    {
      time: generateRandomTime(),
      hallNo: 1,
      statingPrice: 50,
      bonus: 2500,
    },
  ]);

  useEffect(() => {
    if (selectedDate != null && selectedHall != null) setDisabled(false);
  }, [selectedDate, selectedHall]);

  const renderDateItem = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles(selectedDate?.label === item.label).dateButton}
      onPress={() => setSelectedDate(item)}>
      <Text style={styles(selectedDate?.label === item.label).dateText}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderHalls = ({item, index}: any) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles(selectedHall?.index == index).hallCont]}
      onPress={() => setSelectedHall({...item, index})}>
      <Text style={styles().hallTime}>
        {item.time}
        <Text
          style={
            styles().hallNumber
          }>{`    Cinetech + hall ${item.hallNo}`}</Text>
      </Text>
      <View style={styles(selectedHall?.index == index).imageCont}>
        <Image source={imgs.cinema} style={styles().cinemaImg} />
      </View>

      <Text style={styles().bottomText}>
        From <Text style={styles().price}>{item.statingPrice}$</Text> or
        <Text style={styles().price}> {item.bonus} bonus</Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <View style={[styles().container]}>
        <CustomHeader
          IconLeft={<Svgs.backArrow color={colors.black} />}
          detail={{name: title, description: 'In Theaters ' + date}}
          IconRight={<></>}
        />
        <View>
          <Text style={styles().dateTxt}>Date</Text>
          <View>
            <FlatList
              data={generateDates()}
              renderItem={renderDateItem}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles().dateList}
            />
            <FlatList
              data={halls}
              renderItem={renderHalls}
              keyExtractor={(item, index) => `${item.time}_${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles().hallList}
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          disabled={disabled}
          style={styles(disabled).bookButton}
          onPress={() =>
            props?.navigation.navigate('SeatSelection', {
              date,
              title,
              hall: selectedHall,
              selectedDate: selectedDate,
            })
          }>
          <Text style={styles().bookText}>Select Seat</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = (props?: any) =>
  StyleSheet.create({
    headerCont: {
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontFamily: fontFamily.medium,
      color: colors.black,
      lineHeight: 20,
    },
    date: {
      fontSize: 12,
      fontFamily: fontFamily.medium,
      color: colors.MayaBlue,
    },
    container: {
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom:HP(3)
    },
    dateTxt: {
      fontSize: 16,
      fontFamily: fontFamily.medium,
      color: colors.black,
      width: WP(90),
      alignSelf: 'center',
      marginBottom: HP(1.4),
    },
    dateList: {
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    dateButton: {
      width: 67,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: props ? colors.MayaBlue : colors.disableGrey,
      shadowColor: props ? colors.MayaBlue : 'transparent',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginRight: 10,
    },
    dateText: {
      fontSize: 12,
      lineHeight: 17,
      fontFamily: fontFamily.semi_bold,
      color: props ? colors.white : colors.black,
    },
    hallList: {
      marginTop: HP(3.9),
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    hallCont: {
      marginRight: 10,
    },
    hallTime: {
      fontSize: 12,
      fontFamily: fontFamily.medium,
      color: colors.black,
      lineHeight: 19,
      marginBottom: 5,
    },
    hallNumber: {
      fontSize: 12,
      fontFamily: fontFamily.regular,
      color: colors.black,
    },
    imageCont: {
      width: WP(63),
      height: HP(17),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: props ? colors.MayaBlue : colors.disableGrey,
      borderRadius: 10,
    },
    cinemaImg: {
      width: 144,
      height: 113,
      resizeMode: 'contain',
    },
    bottomText: {
      fontSize: 12,
      fontFamily: fontFamily.medium,
      color: colors.gray,
      marginTop: HP(1),
    },
    price: {
      fontSize: 12,
      fontFamily: fontFamily.medium,
      color: colors.black,
    },
    bookButton: {
      marginTop: HP(22),
      backgroundColor: props ? colors.gray : colors.MayaBlue,
      width: WP(90),
      height: HP(6.5),
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    bookText: {
      fontFamily: fontFamily.semi_bold,
      color: colors.white,
      fontSize: 14,
      lineHeight: 20,
    },
  });
