import { ref, nextTick } from 'vue';

export function useTextareaResize() {
  const descriptionTextarea = ref<HTMLTextAreaElement | null>(null);

  const resizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'; // Сбросить высоту перед установкой новой
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleTextareaInput = () => {
    if (descriptionTextarea.value) {
      resizeTextarea(descriptionTextarea.value);
    }
  };

  const adjustTextareaOnMount = async () => {
    await nextTick();
    if (descriptionTextarea.value) {
      resizeTextarea(descriptionTextarea.value);
    }
  };

  return {
    descriptionTextarea,
    handleTextareaInput,
    adjustTextareaOnMount,
  };
}
