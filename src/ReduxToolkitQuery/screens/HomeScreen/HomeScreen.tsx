import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  getUsers,
  useGetUserQuery,
  useGetUsersQuery,
} from '../../store/user/userServices';
import BaseModal from '../../components/BaseModal';
import {
  useGetMeQuery,
  usePostLoginMutation,
} from '../../store/auth/authService';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken, setToken} from '../../store/persist/persistSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(0);
  const [skip, setSkip] = useState({
    skipUser: true,
  });
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [form, setForm] = useState({
    username: 'kminchelle',
    password: '0lelplR',
    skip: true,
  });
  const {data: users, isLoading, isFetching} = useGetUsersQuery({page: page});
  const {data: user, isFetching: fetchingUser} = useGetUserQuery(
    {id: selectedUser},
    {skip: skip.skipUser},
  );
  const [
    postLogin,
    {isLoading: loginLoading, isError, error, data: loginData},
  ] = usePostLoginMutation();
  const {
    data: loginUser,

    isError: loginUserIsError,
    error: loginUserError,
  } = useGetMeQuery(
    {token: useSelector((state: any) => state.persist.token)},
    {
      skip: !useSelector((state: any) => state.persist.token),
      refetchOnMountOrArgChange: false,
    },
  );

  const Space = ({height, width}: {height?: number; width?: number}) => (
    <View style={{height: height, width: width}} />
  );

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size={'large'} style={{marginTop: 100}} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{paddingVertical: 10, borderWidth: 1, marginBottom: 20}}
            onPress={() => {
              setShowLogin(true);
            }}>
            <Text style={{textAlign: 'center'}}>Login</Text>
          </TouchableOpacity>
          {users?.data?.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  marginBottom: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}
                key={index}
                onPress={() => {
                  setSelectedUser(item?.id);
                  setShowModal(true);
                  setSkip({...skip, skipUser: false});
                }}>
                <Image
                  source={{uri: item?.avatar}}
                  style={{resizeMode: 'contain', height: 100, width: 100}}
                />
                <View>
                  <Text>{item.name}</Text>
                  <Text style={{marginTop: 5}}>{item.email}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          {isFetching && (
            <ActivityIndicator size={'large'} style={{marginVertical: 10}} />
          )}
          {users && page < users?.total_pages && (
            <TouchableOpacity
              style={{paddingVertical: 10, borderWidth: 1}}
              onPress={() => {
                if (users) {
                  if (page < users.total_pages) {
                    setPage(page + 1);
                  }
                }
              }}>
              <Text style={{textAlign: 'center'}}>Load More</Text>
            </TouchableOpacity>
          )}

          <View style={{height: 100}} />
        </ScrollView>
      )}
      <BaseModal
        showModal={showModal}
        onBackdropPress={() => {
          setSkip({...skip, skipUser: true});
          setShowModal(false);
        }}>
        {fetchingUser ? (
          <ActivityIndicator size={'large'} style={{marginVertical: 10}} />
        ) : (
          <View
            style={{
              marginBottom: 15,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Image
              source={{uri: user?.data?.avatar}}
              style={{resizeMode: 'contain', height: 100, width: 100}}
            />
            <View>
              <Text>{user?.data?.name}</Text>
              <Text style={{marginTop: 5}}>{user?.data?.email}</Text>
            </View>
          </View>
        )}
      </BaseModal>
      <BaseModal
        showModal={showLogin}
        onBackdropPress={() => {
          setShowLogin(false);
        }}>
        <View>
          {!loginUser && (
            <View>
              <Text style={{textAlign: 'center'}}>Login</Text>
              <Space height={10} />
              <TextInput
                autoCapitalize="none"
                value={form?.username}
                onChangeText={text => {
                  setForm({...form, username: text});
                }}
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  color: 'black',
                  fontSize: 14,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                placeholder="Username"
                placeholderTextColor={'gray'}
              />
              <Space height={10} />
              <TextInput
                autoCapitalize="none"
                value={form?.password}
                onChangeText={text => {
                  setForm({...form, password: text});
                }}
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  color: 'black',
                  fontSize: 14,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  width: '100%',
                }}
                placeholder="Password"
                placeholderTextColor={'gray'}
              />
              <Space height={10} />
              <TouchableOpacity
                onPress={async () => {
                  try {
                    const result = await postLogin({
                      username: form?.username,
                      password: form?.password,
                    }).unwrap();
                    dispatch(setToken(result.data.token));
                  } catch (error) {}
                }}
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  paddingVertical: 10,
                  width: '50%',
                  alignSelf: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}

          <Space height={20} />
          {loginLoading ? (
            <ActivityIndicator size={'large'} style={{marginVertical: 10}} />
          ) : (
            <View>
              {isError && (
                <View>
                  <Text>{error?.message}</Text>
                </View>
              )}
              {loginUserIsError && (
                <View>
                  <Text>{loginUserError?.message}</Text>
                </View>
              )}
              {loginUser && (
                <View>
                  <View
                    style={{
                      marginBottom: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Image
                      source={{uri: loginUser?.data?.image}}
                      style={{resizeMode: 'contain', height: 100, width: 100}}
                    />
                    <View>
                      <Text>{loginUser?.data?.fullname}</Text>
                      <Text style={{marginTop: 5}}>
                        {loginUser?.data?.email}
                      </Text>
                      <Text style={{marginTop: 5}}>
                        {loginUser?.data?.username}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(clearToken());
                    }}
                    style={{
                      borderWidth: 1,
                      borderColor: 'black',
                      paddingVertical: 10,
                      width: '50%',
                      alignSelf: 'center',
                    }}>
                    <Text style={{textAlign: 'center'}}>Logout</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </BaseModal>
    </View>
  );
};

export default HomeScreen;
