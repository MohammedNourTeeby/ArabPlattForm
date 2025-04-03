"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// أنماط PDF مع التحقق من الأخطاء
const getSafeStyles = () => {
  try {
    return StyleSheet.create({
      page: { 
        padding: 30, 
        fontFamily: 'Helvetica',
        direction: 'rtl'
      },
      header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold'
      },
      table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 10
      },
      tableRow: {
        flexDirection: 'row'
      },
      tableCell: {
        padding: 8,
        fontSize: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        width: '20%'
      }
    });
  } catch (error) {
    console.error('Failed to create PDF styles:', error);
    return {};
  }
};

const FinancialReportPDF = ({ data = [] }) => {
  const styles = getSafeStyles();
  
  // تحويل البيانات إلى هيكل آمن مع قيم افتراضية
  const safeData = Array.isArray(data) 
    ? data.map(item => ({
        date: item?.date || '--',
        type: item?.type || '--',
        amount: Number(item?.amount) || 0,
        currency: item?.currency || 'ر.س',
        status: item?.status || '--'
      }))
    : [];

  return (
    <Document>
      <Page size="A4" style={styles.page || {}}>
        <Text style={styles.header || {}}>التقرير المالي</Text>
        
        <View style={styles.table || {}}>
          <View style={styles.tableRow || {}}>
            <Text style={styles.tableCell || {}}>التاريخ</Text>
            <Text style={styles.tableCell || {}}>النوع</Text>
            <Text style={styles.tableCell || {}}>المبلغ</Text>
            <Text style={styles.tableCell || {}}>الحالة</Text>
          </View>
          
          {safeData.map((item, index) => (
            <View key={index} style={styles.tableRow || {}}>
              <Text style={styles.tableCell || {}}>{item.date}</Text>
              <Text style={styles.tableCell || {}}>{item.type}</Text>
              <Text style={styles.tableCell || {}}>
                {item.amount.toLocaleString()} {item.currency}
              </Text>
              <Text style={styles.tableCell || {}}>{item.status}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default FinancialReportPDF;