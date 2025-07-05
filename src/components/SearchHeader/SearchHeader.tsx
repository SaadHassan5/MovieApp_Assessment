import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../assets/config/colors';
import {HP, mvs, WP} from '../../assets/config/space';
import Svgs from '../../assets/graphics/svgs';
import {GlobalStyles} from '../../assets/config/globalStyles';

interface SearchHeaderProps {
  onCross: () => void;
  value: string;
  OnTextChange?: (text: string) => void;
  onSubmit?: () => void;
}

export default function SearchHeader({
  onCross,
  value,
  OnTextChange,
  onSubmit,
}: SearchHeaderProps) {
  return (
    <View style={styles.searchBarContainer}>
      <View style={GlobalStyles().row}>
        <Svgs.search style={styles.searchIcon} />
        <TextInput
          autoFocus={true}
          placeholderTextColor={colors.placeholder_gray}
          placeholder="TV shows, movies and more"
          value={value}
          onChangeText={OnTextChange}
          style={styles.textInput}
          returnKeyType='done'
          onSubmitEditing={onSubmit}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.crossIcon}
          onPress={onCross}>
          <Svgs.cross />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: colors.white,
    height: 52,
    paddingHorizontal: WP(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: WP(3),
    zIndex: 1,
  },
  crossIcon: {
    position: 'absolute',
    right: WP(3),
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.screenBackground,
    height: HP(5.5),
    borderRadius: mvs(30),
    paddingHorizontal: WP(10),
  },
  closeIcon: {
    width: 36,
    height: 36,
    marginLeft: 10,
  },
});
