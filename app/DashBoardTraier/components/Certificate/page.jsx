"use client"
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  PictureAsPdf,
  ShoppingCart,
  CheckCircle,
  MonetizationOn
} from '@mui/icons-material';

// الألوان المحددة
const themeColors = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011'
};

// بيانات وهمية
const dummyData = {
  courses: [
    {
      id: 1,
      title: 'دورة تطوير الويب المتقدم',
      price: 299,
      certificates: [
        { id: 1, name: 'الشهادة الأساسية', price: 49, instructorShare: 70 },
        { id: 2, name: 'الشهادة المتقدمة', price: 79, instructorShare: 65 },
      ]
    },
    {
      id: 2,
      title: 'دورة UI/UX الاحترافية',
      price: 199,
      certificates: [
        { id: 3, name: 'شهادة التصميم الأساسي', price: 39, instructorShare: 75 },
      ]
    }
  ],
  purchasedCertificates: [
    { id: 1, courseId: 1, date: '2024-03-15', status: 'مكتمل' }
  ]
};

const CertificateSystem = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCertificate, setNewCertificate] = useState({ name: '', price: '', instructorShare: '' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAddCertificate = (courseId) => {
    const updatedCourses = dummyData.courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          certificates: [...course.certificates, { ...newCertificate, id: Date.now() }]
        };
      }
      return course;
    });
    dummyData.courses = updatedCourses;
    setOpenAddDialog(false);
    setNewCertificate({ name: '', price: '', instructorShare: '' });
  };

  const calculatePlatformShare = (price, instructorShare) => {
    return price * (100 - instructorShare) / 100;
  };

  return (
    <Box sx={{
      p: isMobile ? 2 : 4,
      backgroundColor: themeColors.white,
      minHeight: '100vh'
    }}>
      {/* شريط العنوان */}
      <Box sx={{
        mb: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `2px solid ${themeColors.gray}`,
        pb: 2
      }}>
        <Typography variant="h4" sx={{
          color: themeColors.black,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <CheckCircle sx={{ color: themeColors.blue }} />
          نظام إدارة الشهادات
        </Typography>
      </Box>

      {/* قائمة الكورسات */}
      <Grid container spacing={3}>
        {dummyData.courses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Paper sx={{
              p: 2,
              borderRadius: 2,
              border: `1px solid ${themeColors.gray}`,
              position: 'relative'
            }}>
              {/* عنوان الكورس */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}>
                <Typography variant="h6" sx={{ color: themeColors.black }}>
                  {course.title}
                </Typography>
                <Chip
                  label={`السعر الأساسي: $${course.price}`}
                  sx={{ backgroundColor: themeColors.yellow, color: themeColors.black }}
                />
              </Box>

              {/* قائمة الشهادات */}
              {course.certificates.map((certificate) => (
                <Card key={certificate.id} sx={{
                  mb: 2,
                  border: `1px solid ${themeColors.gray}`,
                  borderRadius: 2
                }}>
                  <CardContent>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1
                    }}>
                      <Typography variant="h6" sx={{ color: themeColors.black }}>
                        {certificate.name}
                      </Typography>
                      <Chip
                        label={`السعر: $${certificate.price}`}
                        sx={{ backgroundColor: themeColors.blue, color: themeColors.white }}
                      />
                    </Box>

                    {/* تفاصيل التوزيع المالي */}
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mt: 2,
                      p: 1,
                      backgroundColor: themeColors.gray + '15',
                      borderRadius: 1
                    }}>
                      <Box>
                        <Typography variant="body2" sx={{ color: themeColors.black }}>
                          نسبة المدرب:
                        </Typography>
                        <Chip
                          label={`${certificate.instructorShare}%`}
                          sx={{ backgroundColor: themeColors.red, color: themeColors.white }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: themeColors.black }}>
                          حصة المنصة:
                        </Typography>
                        <Chip
                          label={`$${calculatePlatformShare(certificate.price, certificate.instructorShare).toFixed(2)}`}
                          sx={{ backgroundColor: themeColors.gray, color: themeColors.white }}
                        />
                      </Box>
                    </Box>
                  </CardContent>

                  {/* أزرار التحكم */}
                  <CardActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<Edit />}
                      sx={{
                        borderColor: themeColors.blue,
                        color: themeColors.blue
                      }}
                    >
                      تعديل
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      sx={{
                        backgroundColor: themeColors.yellow,
                        color: themeColors.black,
                        '&:hover': { backgroundColor: '#d4b50f' }
                      }}
                    >
                      شراء الشهادة
                    </Button>
                  </CardActions>
                </Card>
              ))}

              {/* زر إضافة شهادة جديدة */}
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Add />}
                onClick={() => {
                  setSelectedCourse(course.id);
                  setOpenAddDialog(true);
                }}
                sx={{
                  mt: 2,
                  borderColor: themeColors.gray,
                  color: themeColors.black
                }}
              >
                إضافة شهادة جديدة
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* نموذج إضافة شهادة */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle sx={{ color: themeColors.black }}>
          {editMode ? 'تعديل الشهادة' : 'إضافة شهادة جديدة'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="اسم الشهادة"
            value={newCertificate.name}
            onChange={(e) => setNewCertificate({ ...newCertificate, name: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="السعر"
            type="number"
            value={newCertificate.price}
            onChange={(e) => setNewCertificate({ ...newCertificate, price: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="نسبة المدرب (%)"
            type="number"
            value={newCertificate.instructorShare}
            onChange={(e) => setNewCertificate({ ...newCertificate, instructorShare: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenAddDialog(false)}
            sx={{ color: themeColors.red }}
          >
            إلغاء
          </Button>
          <Button
            onClick={() => handleAddCertificate(selectedCourse)}
            sx={{
              backgroundColor: themeColors.blue,
              color: themeColors.white,
              '&:hover': { backgroundColor: '#006699' }
            }}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      {/* قسم الشهادات المشتراة */}
      <Paper sx={{ mt: 4, p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, color: themeColors.black }}>
          الشهادات المشتراة
        </Typography>
        {dummyData.purchasedCertificates.map((certificate) => (
          <Card key={certificate.id} sx={{ mb: 2, border: `1px solid ${themeColors.gray}` }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: themeColors.black }}>
                  {dummyData.courses
                    .find(c => c.id === certificate.courseId)
                    ?.certificates.find(ct => ct.id === certificate.id)?.name}
                </Typography>
                <Chip
                  label={certificate.status}
                  sx={{
                    backgroundColor: certificate.status === 'مكتمل' ? themeColors.blue : themeColors.yellow,
                    color: themeColors.white
                  }}
                />
              </Box>
              <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<PictureAsPdf />}
                  sx={{ borderColor: themeColors.red, color: themeColors.red }}
                >
                  تحميل PDF
                </Button>
                <Button
                  variant="contained"
                  startIcon={<MonetizationOn />}
                  sx={{ backgroundColor: themeColors.gray, color: themeColors.white }}
                >
                  تفاصيل الدفع
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Paper>
    </Box>
  );
};

export default CertificateSystem;