import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateBotMutation } from '@/module/banners/api/banners';
import { isApiError } from '@/helpers/auth/apiError';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Select } from 'native-base';
type Props = {
  onCloseBuilderModal: () => void;
};

type Inputs = {
  [key: string]: string | undefined;
};

export const BuilderModal = ({ onCloseBuilderModal }: Props) => {
  const [error, setError] = useState('');
  const [bot, setBot] = useState<any>(null);

  const [fields, setFields] = useState<Array<{ type: string, name: string, label: string, options?: string[] }>>([]);

  const [createBot] = useCreateBotMutation();

  const router = useRouter();

  const [botLocal, setBotLocal] = useState<any>({});

  useEffect(() => {
    const fetchBotLocal = async () => {
      try {
        const botLocalString = await AsyncStorage.getItem('activePublicBot');
        const botLocalData = botLocalString ? JSON.parse(botLocalString) : {};
        setBotLocal(botLocalData);
      } catch (error) {
        console.error('Failed to fetch activePublicBot from AsyncStorage:', error);
      }
    };

    fetchBotLocal();
  }, []);

  useEffect(() => {
    const fetchBotData = async () => {
      try {
        const activeBotString = await AsyncStorage.getItem('activePublicBot');
        const activeBot = activeBotString ? JSON.parse(activeBotString) : {};
        setBot(activeBot);

        const pattern = /\{\$prompt_param_(input|select):([^:]+):"([^"]+)"(?::([^}]+))?\}/g;
        const matches = [...activeBot.prompt.matchAll(pattern)];

        const dynamicFields = matches.map(match => ({
          type: match[1],
          name: match[2],
          label: match[3],
          options: match[4] ? match[4].split('|') : undefined
        }));

        setFields(dynamicFields);
      } catch (error) {
        console.error('Failed to fetch bot data:', error);
      }
    };

    fetchBotData();
  }, []);

  const schema = yup.object().shape(
    fields.reduce((acc, field) => {
      acc[field.name] = yup.string().required(`${field.label} is required`);
      return acc;
    }, {})
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let updatedPrompt = bot.prompt;

    fields.forEach((field) => {
      const fieldValue = data[field.name];
      const regex = new RegExp(`\\{\\$prompt_param_${field.type}:${field.name}:"[^"]+"(?::[^}]+)?\\}`, 'g');
      updatedPrompt = updatedPrompt.replace(regex, `${fieldValue}`);
    });

    console.log('Updated Prompt:', updatedPrompt);

    const formData = new FormData();

    formData.append("botName", botLocal.botname);
    formData.append("botDescription", botLocal.description);
    formData.append("botPrompt", updatedPrompt);

    try {
      const response = await createBot(formData).unwrap();
      onCloseBuilderModal()
      router.push('/profile')
    } catch (error) {
      if (isApiError(error)) {
        setError(error.data.message);
      } else {
        setError('Error signing in');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onCloseBuilderModal}>
          <EvilIcons name="close" size={30} color='#F5F5F5' />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Builder</Text>

      <View>
        {fields.map(field => (
          <View key={field.name}>
            {field.type === 'input' && (
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder={field.label}
                    style={styles.input}
                    placeholderTextColor={'#F5F5F5'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            )}
            {field.type === 'select' && (
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, value } }) => (
                  <Select
                    selectedValue={value}
                    onValueChange={onChange}
                    style={styles.select}
                    bgColor="#424242"
                    color={'#fff'}
                    borderColor={'transparent'}
                    placeholder={field.label}
                  >
                    <Select.Item label={field.label} value='' />
                    {field.options?.map(option => (
                      <Select.Item key={option} label={option} value={option} />
                    ))}
                  </Select>
                )}
              />
            )}
            {errors[field.name] && <Text style={styles.error}>{errors[field.name]?.message}</Text>}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text>Создать</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#303136',
    width: '100%',
    justifyContent: 'center',
  },
  iconContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    color: '#F5F5F5',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#424242',
    color: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#F5F5F5',
    color: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
    marginTop: 8,
    width: '100%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  select: {
    borderRadius: 8,
    width: '100%',
    fontSize: 14,
    color: '#fff',
  },
  updateText: {
    color: '#F5F5F5',
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  }
});
