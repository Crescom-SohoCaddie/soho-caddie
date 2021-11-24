from app import db, app
from models import Setting
import unittest
import subprocess


class BasicTest(unittest.TestCase):

    @classmethod
    def setUpClass(self):
        # print('-----setUp-----')
        pass

    # テスト後にシーダーを流しなおす
    @classmethod
    def tearDownClass(cls):
        print("---tearDown---")
        subprocess.call('python seeder.py', shell=True)

    # Settingは一件だけかと思うので一応コメントアウト
    # def test_get_settings(self):
    #     print('---Setting全件読み込み---')
    #     settings = Setting.query.all()
    #     settingCount = len(settings)
    #     self.assertTrue(settingCount)

    def test_get_setting_byId(self):
        print('---Setting一件読み込み---')
        setting = Setting.query.filter(Setting.id == 1).first()
        self.assertTrue(setting)
        self.assertEqual(setting.companyName, '自社株式会社')

        print('---Setting一件読み込み失敗---')
        settings = Setting.query.filter(Setting.id == 9999).all()
        self.assertFalse(settings)
        self.assertEqual(len(settings), 0)

    def test_update_setting(self):
        print('---Setting一件更新---')
        setting = Setting.query.filter(Setting.id == 1).first()
        setting.companyName = 'テスト入力株式会社'
        db.session.commit()
        setting = Setting.query.filter(Setting.id == 1).first()
        self.assertEqual(setting.companyName, "テスト入力株式会社")

    # Settingは一件だけかと思うので一応コメントアウト
    # def test_create_setting(self):
    #     print('---Setting新規作成---')
    #     settings = [
    #         Setting(settingName='式'),
    #         Setting(settingName='枚'),
    #     ]
    #     db.session.add_all(settings)
    #     db.session.commit()
    #     self.assertGreaterEqual(len(Setting.query.all()), 2)

    # def test_delete_setting(self):
    #     print('---Setting一件削除---')
    #     setting = Setting.query.filter(Setting.id == 1).delete()
    #     db.session.commit()

    #     setting = Setting.query.filter(Setting.id == 1).all()
    #     self.assertGreaterEqual(len(setting), 0)


if __name__ == '__main__':
    unittest.main()
