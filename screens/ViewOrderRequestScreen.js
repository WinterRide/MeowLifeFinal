import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { firestore } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import ListingHistoryCard from "../components/ListingHistoryCard";
import { getData } from "../controller/DistinctController";
import OrderViewCard from "../components/OrderViewCard";
import { useUser } from "../UserContext";

const window = Dimensions.get("window");
const windowWidth = window.width;
const windowHeight = window.height;

const ViewOrderRequestScreen = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { userInfo } = useUser();

  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      try {
        setData(await getData("orders"));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchProducts();
    setLoading(false);
  }, []);

  const filterOrder = (data) => {
    return data.filter(
      (item) =>
        item.seller.includes(userInfo.email) &&
        item.itemId == route.params.id &&
        item.status == "Pending"
    );
  };

  const filteredData = filterOrder(data);

  return (
    <View>
      <ScrollView
        style={{
          width: windowWidth * 0.9,
          height: windowHeight,
          margin: "auto",
          paddingVertical: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>Order Request</Text>
          <View style={styles.subContainer}>
            {loading ? (
              <>
                <View style={styles.loadingTxt}>
                  <Text>Loading...</Text>
                </View>
              </>
            ) : filteredData.length === 0 ? (
              <>
                <View style={styles.loadingTxt}>
                  <Text>No Order to be shown</Text>
                </View>
              </>
            ) : (
              filteredData.map((item, index) => {
                return <OrderViewCard key={index} index={index} item={item} />;
              })
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewOrderRequestScreen;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    gap: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  loadingTxt: {
    width: "100%",
    height: windowHeight / 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
