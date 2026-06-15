import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';
import { TaskItem } from './types';

interface NewTaskModalProps {
  onClose: () => void;
  onSubmit: (task: Omit<TaskItem, 'id' | 'time' | 'unread' | 'section'>) => void;
}

export default function NewTaskModal({ onClose, onSubmit }: NewTaskModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('公文管理');
  const [type, setType] = useState<'签报' | '发文' | '收文' | '印章' | '休假'>('签报');
  const [urgent, setUrgent] = useState(false);
  const [sender, setSender] = useState('郑成功');
  const [description, setDescription] = useState('');

  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setValidationError('流程主题不能为空！');
      return;
    }
    if (!description.trim()) {
      setValidationError('流程详情描述不能为空！');
      return;
    }

    onSubmit({
      title,
      category,
      type,
      urgent,
      sender,
      description
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs select-none">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-100 p-6 animate-in fade-in zoom-in-95 duration-155">
        
        {/* Header bar */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-red-600" />
            <h2 className="text-base font-bold text-gray-800">新建协同办公业务流程</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form contents */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-[13px]">
          
          {validationError && (
            <div className="p-3 bg-red-50 text-red-600 rounded flex items-center space-x-2 text-xs font-semibold animate-shake">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Theme Title */}
          <div className="space-y-1">
            <label className="font-bold text-gray-700">流程主题 / 公文标题 <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setValidationError('');
              }}
              placeholder="请输入清晰的流程标题 (例如: 申请在天河支行配置智能终端01号柜...)"
              className="w-full h-9 px-3 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 bg-gray-50/20"
            />
          </div>

          {/* Grid Category and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">业务类别</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full h-9 px-2 border border-gray-200 bg-white rounded focus:outline-none focus:ring-1 focus:ring-red-400"
              >
                <option value="签报">签报 (QB)</option>
                <option value="发文">发文 (FW)</option>
                <option value="收文">收文 (SW)</option>
                <option value="印章">印章 (YZ)</option>
                <option value="休假">休假 (XJ)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">所属模块</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 px-2 border border-gray-200 bg-white rounded focus:outline-none focus:ring-1 focus:ring-red-400"
              >
                <option value="会议安排">会议安排</option>
                <option value="公文管理">公文管理</option>
                <option value="流程管理">流程管理</option>
                <option value="规章制度">规章制度</option>
                <option value="信息公告">信息公告</option>
              </select>
            </div>
          </div>

          {/* Sender & Urgency Grid */}
          <div className="grid grid-cols-2 gap-4 items-center pt-2">
            <div className="space-y-1">
              <label className="font-bold text-gray-700">拟稿人姓名</label>
              <input
                type="text"
                required
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full h-9 px-3 border border-gray-200 rounded focus:outline-none bg-gray-100 text-gray-500 cursor-not-allowed"
                disabled
              />
            </div>

            <div className="flex items-center h-full pt-4 pl-2">
              <label className="relative flex items-center space-x-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                  className="h-4 w-4 rounded text-red-600 focus:ring-red-400 border-gray-300"
                />
                <span className="font-semibold text-gray-700">此事项设为【紧急】</span>
              </label>
            </div>
          </div>

          {/* Details / Description */}
          <div className="space-y-1">
            <label className="font-bold text-gray-700">呈批详情拟文说明 <span className="text-red-500">*</span></label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setValidationError('');
              }}
              placeholder="请输入该流程的具体工作规划、涉及人员、拟调达标准以及资金或技术背景等，供审批领导参考阅处..."
              className="w-full p-3 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 bg-gray-50/20"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-600 bg-white hover:bg-gray-100 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold shadow-md hover:shadow-lg transition-all"
            >
              提交流程审批
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
