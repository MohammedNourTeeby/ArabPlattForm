'use client';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 15,
  },
  recipient: {
    fontSize: 22,
    color: '#4a5568',
    marginBottom: 10,
  },
  body: {
    marginVertical: 20,
    textAlign: 'center',
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
  qrContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 12,
    color: '#718096',
  },
});

export default function CertificateTemplate({
  recipientName,
  courseName,
  issueDate,
  instructorName,
  courseDuration,
  verificationLink
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* الشعار أو العنوان */}
        <View style={styles.header}>
          <Text style={{ fontSize: 24, color: '#2b6cb0' }}>مؤسسة التعلم الإلكتروني</Text>
        </View>

        {/* المحتوى الرئيسي */}
        <View style={styles.body}>
          <Text style={styles.title}>شهادة إتمام الدورة</Text>
          <Text style={styles.recipient}>ممنوحة إلى: {recipientName}</Text>
          
          <View style={{ marginVertical: 25 }}>
            <Text style={{ fontSize: 18 }}>لإتمام دورة تدريبية في</Text>
            <Text style={{ fontSize: 22, color: '#2b6cb0', marginTop: 10 }}>{courseName}</Text>
          </View>

          {/* التفاصيل */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.details}>المدرب: {instructorName}</Text>
            <Text style={styles.details}>المدة: {courseDuration}</Text>
            <Text style={styles.details}>تاريخ الإصدار: {new Date(issueDate).toLocaleDateString('ar-SA')}</Text>
          </View>
        </View>

        {/* رمز QR */}
        <View style={styles.qrContainer}>
          {verificationLink && (
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${verificationLink}`}
              style={{ width: 150, height: 150 }}
            />
          )}
        </View>

        {/* التذييل */}
        <View style={styles.footer}>
          <Text>رقم التصديق: {verificationLink?.split('/').pop()}</Text>
          <Text>يمكن التحقق من صحة الشهادة عبر الموقع الرسمي</Text>
        </View>
      </Page>
    </Document>
  );
}