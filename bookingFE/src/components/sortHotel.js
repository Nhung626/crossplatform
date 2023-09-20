import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { categories } from '../constains'
import { themeColor } from '../theme'

export default function SortHotel() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <View style={{ paddingBottom: 10, backgroundColor: themeColor.bgColor }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap', // Cho phép các phần tử xuống dòng khi không còn không gian ngang
          justifyContent: 'flex-start',
        }}
      >

        {
          categories.map((category) => {
            let isActive = category.id === activeCategory;
            let btnClass = isActive ? styles.activeButton : styles.inactiveButton;
            let textClass = isActive ? styles.activeText : styles.inactiveText;
            return (
              <View key={category.id} style={{
                marginBottom: 2, marginRight: 5
              }}>
                <TouchableOpacity
                  onPress={() => setActiveCategory(category.id)}

                  style={[styles.button, btnClass]} >

                  <Text style={[styles.text, isActive && styles.activeText]}>        {category.name}      </Text>



                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>

    </View>
  )

}
const styles = {
  button: {
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: themeColor.btColor,

  },

  activeButton: {
    backgroundColor: themeColor.btColor, // Thay đổi màu sắc cho lớp active
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
  activeText: {
    fontWeight: 'bold', // Thay đổi kiểu chữ cho lớp active
    color: 'white', // Thay đổi màu sắc cho lớp active
  },
  inactiveButton: {
    backgroundColor: themeColor.bgColor, // Thay đổi màu sắc cho lớp inactive
  },
};
